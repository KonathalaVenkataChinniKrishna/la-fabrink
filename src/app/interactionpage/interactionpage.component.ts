import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as d3 from './custom.d3';
import {
  hierarchy,
  HierarchyNode,
  HierarchyPointNode,
  HierarchyLink,
  HierarchyPointLink,
  StratifyOperator,
  TreeLayout,
  tree,
  ClusterLayout,
  cluster
} from 'd3-hierarchy';
import {NvD3Module} from 'ng2-nvd3';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';
import { forEach } from '@angular/router/src/utils/collection';

interface HierarchyDatum {
  name: string;
  value: number;
  children?: Array<HierarchyDatum>;
}

// const data: HierarchyDatum = {
//   name: 'A1',
//   value: 100,
//   children: [
//       {
//           name: 'B1',
//           value: 100,
//           children: [
//               {
//                   name: 'C1',
//                   value: 100,
//                   children: undefined
//               },
//               {
//                   name: 'C2',
//                   value: 300,
//                   children: [
//                       {
//                           name: 'D1',
//                           value: 100,
//                           children: undefined
//                       },
//                       {
//                           name: 'D2',
//                           value: 300,
//                           children: undefined
//                       }
//                   ]
//               },
//               {
//                   name: 'C3',
//                   value: 200,
//                   children: undefined
//               }
//           ]
//       },
//       {
//           name: 'B2',
//           value: 200,
//           children: [
//               {
//                   name: 'C4',
//                   value: 100,
//                   children: undefined
//               },
//               {
//                   name: 'C5',
//                   value: 300,
//                   children: undefined
//               },
//               {
//                   name: 'C6',
//                   value: 200,
//                   children: [
//                       {
//                           name: 'D3',
//                           value: 100,
//                           children: undefined
//                       },
//                       {
//                           name: 'D4',
//                           value: 300,
//                           children: undefined
//                       }
//                   ]
//               }
//           ]
//       }
//   ]
// };

@Component({
  selector: 'app-interactionpage',
  templateUrl: './interactionpage.component.html',
  styleUrls: ['./interactionpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InteractionpageComponent implements OnInit {

  private margin: any = { top: 30, right: 200, bottom: 30, left: 200 };
     private width: number;
     private height: number;
     private root: HierarchyPointNode<HierarchyDatum>;
     private tree: TreeLayout<HierarchyDatum>;
     private svg: any;
     private diagonal: any;
  constructor(public sharedModule: SharedModule) {}

  ngOnInit() {
    console.log('D3.js version:', d3['version']);

    this.loadForceDirectedGraph();
    // this.loadDendogram();
  }

  private draw(root: HierarchyPointNode<HierarchyDatum>) {
    // Nodes
    d3.select('svg g.nodes')
        .selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
      // .append('image')
      // .attr('xlink:href', 'https://github.com/favicon.ico')
      // .attr('x', -8)
      // .attr('y', -8)
      // .attr('width', 16)
      // .attr('height', 16)
        // .append('circle')
        // // .classed('node', true)
        // .attr('style', 'fill: white; stroke: steelblue; stroke-width: 3px;')
        // // .attr('cx', function (d) { return d.y; })
        // // .attr('cy', function (d) { return d.x; })
        // .attr('r', 10)
        // .append('title')
        // .text((d) => d.data.name)
        .append('text')
      .attr('dx', function(d) { return d.children ? -8 : 8; })
      .attr('dy', 3)
      .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })
      .text(function(d) { return d.data.name; });
    // Links
    d3.select('svg g.links')
        .selectAll('path.link')
        .data(root.links())
        .enter()
        .append('path')
        .classed('link', true)
        .attr('stroke-width', (d) => Math.sqrt(d.source.value / 100 + d.target.value / 100))
        .attr('style', 'stroke: #ccc;')
        .attr('d', function(d) {
          return 'M' + d.target.y + ',' + d.target.x
          + 'C' + (d.target.y + d.source.y) / 2 + ',' + d.target.x
          + ' ' + (d.target.y + d.source.y) / 2 + ',' + d.source.x
          + ' ' + d.source.y + ',' + d.source.x;
          });
        // .attr('x1', function (d) { return d.source.y; })
        // .attr('y1', function (d) { return d.source.x; })
        // .attr('x2', function (d) { return d.target.y; })
        // .attr('y2', function (d) { return d.target.x; });
}

  loadDendogram() {

    this.width = 1000 - this.margin.right - this.margin.left;
         this.height = 1600 - this.margin.top - this.margin.bottom;
         this.svg = d3.select('.graphs').append('svg')
             .attr('width', this.width + this.margin.right + this.margin.left)
             .attr('height', this.height + this.margin.top + this.margin.bottom)
             .append('g')
             .attr('class', 'g')
            //  .attr('transform', 'translate(5,5)');
             .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
         d3.select('svg g.g')
             .append('g')
             .attr('class', 'links');
         d3.select('svg g.g')
             .append('g')
             .attr('class', 'nodes');
        //  console.log('flare inside', data);
         this.tree = tree<HierarchyDatum>();
         this.tree.size([this.height, this.width]);
         this.sharedModule.getInteractionDendoData().subscribe(treeData => {
           let tmpData: HierarchyDatum;
           console.log(JSON.parse(treeData['_body']));
           tmpData = JSON.parse(treeData['_body']);
            this.root = this.tree(hierarchy<HierarchyDatum>(tmpData));
            this.draw(this.root);
         });

  //   const margin = {top: 20, right: 90, bottom: 30, left: 90},
  //   width = 660 - margin.left - margin.right,
  //   height = 500 - margin.top - margin.bottom;

  // // declares a tree layout and assigns the size
  // const treemap = d3.tree()
  //   .size([height, width]);

  // // load the external data
  // this.sharedModule.getInteractionData().subscribe(treeData => {
  //   treeData = JSON.parse(treeData['_body']);

  //   const nodes = d3.hierarchy(treeData, function(d) {
  //     return d['children'];
  //     });

  //   // nodes = treemap(nodes);

  //   const svg = d3.select('body').append('svg')
  //   .attr('width', width + margin.left + margin.right)
  //   .attr('height', height + margin.top + margin.bottom),
  //   g = svg.append('g')
  //   .attr('transform',
  //     'translate(' + margin.left + ',' + margin.top + ')');

  //   const link = g.selectAll('.link')
  //     .data( nodes.descendants().slice(1))
  //     .enter().append('path')
  //     .attr('class', 'link')
  //     .attr('d', function(d) {
  //         return 'M' + d['y'] + ',' + d['x']
  //         + 'C' + (d['y'] + d['parent']['y']) / 2 + ',' + d['x']
  //         + ' ' + (d['y'] + d['parent']['y']) / 2 + ',' + d['parent']['x']
  //         + ' ' + d['parent']['x'] + ',' + d['parent']['x'];
  //         });

  //   const node = g.selectAll('.node')
  //   .data(nodes.descendants())
  //   .enter().append('g')
  //   .attr('class', function(d) {
  //     return 'node' +
  //     (d['children'] ? ' node--internal' : ' node--leaf'); })
  //   .attr('transform', function(d) {
  //     return 'translate(' + d['y'] + ',' + d['x'] + ')'; });

  //   node.append('circle')
  //   .attr('r', 10);

  //   node.append('text')
  //   .attr('dy', '.35em')
  //   .attr('x', function(d) { return d['children'] ? -13 : 13; })
  //   .style('text-anchor', function(d) {
  //   return d['children'] ? 'end' : 'start'; })
  //   .text(function(d) { return d['data']['name']; });
  // });
  //   // if (error) throw error;

  //   //  assigns the data to a hierarchy using parent-child relationships
  }

  loadForceDirectedGraph() {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['id']))
      .force('charge', d3.forceManyBody().strength(-100).distanceMax(200).distanceMin(10))
      .force('center', d3.forceCenter(width / 2, height / 2));
      // .force('collision', d3.forceCollide().radius(function(d) {
      //   return 1;
      // }));

    this.sharedModule.getInteractionData().subscribe(data => {
      data = JSON.parse(data['_body']);

    // });
    // d3.json('assets/miserables.json', (err, data) => {
    //   if (err) { throw new Error('Bad data file!'); }

    // const elem = svg.selectAll('g')
    // .data(data['nodes'])
    // .call(d3.drag()
    //       .on('start', dragStarted)
    //       .on('drag', dragged)
    //       .on('end', dragEnded)
    //     );

    // /*Create and place the 'blocks' containing the circle and the text */
    // const elemEnter = elem.enter()
    //     .append('g')
    //     .attr('transform', function(d){return 'translate(' + d['x'] + ',' + d['y'] + ')' ; });

    // /*Create the circle for each block */
    // const circle = elemEnter.append('circle')
    //     .attr('r', 10 )
    //     .attr('fill', (d) => color(d['group']));

    // /* Create the text for each block */
    // elemEnter.append('text')
    //     .attr('dx', function(d){return -20; })
    //     .text(function(d){return d['id']; });

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('path')
        .data(data['links'])
        .enter()
        .append('path')
        .attr('stroke-width', (d) => Math.sqrt(d['value']));

      // var node = svg.selectAll(".node")
      //     .data(data['nodes'])
      //   .enter().append("g")
      //     .attr("class", "node");

      // node.append("text")
      // .attr("dx", 12)
      // .attr("dy", ".35em")
      // .text(function(d) { return d['id'] })
      // .call(d3.drag()
      //       .on('start', dragStarted)
      //       .on('drag', dragged)
      //       .on('end', dragEnded)
      //     );
      // .attr("transform", function(d){return "translate("+d['x']+","+d['y']+")"});

      // var elem = svg.selectAll("g myCircleText")
      //   .data(data['nodes'])

      // var elemEnter = elem.enter()
	    // .append("g")
	    // .attr("transform", function(d){return "translate("+d['x']+","+d['y']+")"});

      // var circle = elemEnter.append("circle")
	    // .attr("r", function(d){return 5} )
	    // .attr("stroke","black")
	    // .attr("fill", "white");

      // elemEnter.append("text")
	    // .attr("dx", function(d){return -20})
	    // .text(function(d){return d['id']})
      // .call(d3.drag()
      //     .on('start', dragStarted)
      //     .on('drag', dragged)
      //     .on('end', dragEnded)
      //   );

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(data['nodes'])
        .enter()
        .append('circle')
        .attr('r', 6)
        .attr('fill', (d) => color(d['group']))
        .call(d3.drag()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded)
        );

      node.append('title')
        .text((d) => d['id']);

      simulation
        .nodes(data['nodes'])
        .on('tick', tick);

      simulation.force<d3.ForceLink<any, any>>('link')
        .links(data['links']);

      function tick() {
        link.attr('d', function(d) {
        const x1 = d['source'].x,
            y1 = d['source'].y;
         let   x2 = d['target'].x,
            y2 = d['target'].y;
          const  dx = x2 - x1,
            dy = y2 - y1,
            dr = Math.sqrt(dx * dx + dy * dy);

            // Defaults for normal edge.
         let   drx = dr,
            dry = dr,
           xRotation = 0, // degrees
            largeArc = 0; // 1 or 0
          const  sweep = 1; // 1 or 0

            // Self edge.
            if ( x1 === x2 && y1 === y2 ) {
              // Fiddle with this angle to get loop oriented.
              xRotation = -45;

              // Needs to be 1.
              largeArc = 1;

              // Change sweep to change orientation of loop.
              // sweep = 0;

              // Make drx and dry different to get an ellipse
              // instead of a circle.
              drx = 20;
              dry = 15;

              // For whatever reason the arc collapses to a point if the beginning
              // and ending points of the arc are the same, so kludge it.
              x2 = x2 + 1;
              y2 = y2 + 1;
            }
        return 'M' + x1 + ',' + y1 + 'A' + drx + ',' + dry + ' ' + xRotation + ',' + largeArc + ',' + sweep + ' ' + x2 + ',' + y2;
      });

      node
        .attr('cx', function(d) { return d['x'] = Math.max(35, Math.min(width - 35, d['x'])); })
        .attr('cy', function(d) { return d['y'] = Math.max(35, Math.min(height - 35, d['y'])); });
      // node.attr("transform", function(d) { return "translate(" + d['x'] + "," + d['y'] + ")"; });
    }

      function ticked() {
        link
          .attr('x1', function(d) { return d['source'].x; })
          .attr('y1', function(d) { return d['source'].y; })
          .attr('x2', function(d) { return d['target'].x; })
          .attr('y2', function(d) { return d['target'].y; });

      node
        .attr('cx', function(d) { return d['x'] = Math.max(5, Math.min(width - 5, d['x'])); })
        .attr('cy', function(d) { return d['y'] = Math.max(5, Math.min(height - 5, d['y'])); });
      }
    });

    function dragStarted(d) {
      if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) { simulation.alphaTarget(0); }
      d.fx = null;
      d.fy = null;
    }
  }
}
