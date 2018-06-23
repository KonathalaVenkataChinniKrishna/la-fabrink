import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as d3 from './custom.d3';
import {NvD3Module} from 'ng2-nvd3';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-interactionpage',
  templateUrl: './interactionpage.component.html',
  styleUrls: ['./interactionpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InteractionpageComponent implements OnInit {
  constructor(public sharedModule: SharedModule) {}

  ngOnInit() {
    console.log('D3.js version:', d3['version']);

    this.loadForceDirectedGraph();
  }

  loadForceDirectedGraph() {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d) => d['id']))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    this.sharedModule.getInteractionData().subscribe(data => {
      data = JSON.parse(data['_body']);

    // });
    // d3.json('assets/miserables.json', (err, data) => {
    //   if (err) { throw new Error('Bad data file!'); }

      const link = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(data['links'])
        .enter()
        .append('line')
        .attr('stroke-width', (d) => Math.sqrt(d['value']));

      const node = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(data['nodes'])
        .enter()
        .append('circle')
        .attr('r', 5)
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
        .on('tick', ticked);

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
              drx = 30;
              dry = 20;

              // For whatever reason the arc collapses to a point if the beginning
              // and ending points of the arc are the same, so kludge it.
              x2 = x2 + 1;
              y2 = y2 + 1;
            }
        return 'M' + x1 + ',' + y1 + 'A' + drx + ',' + dry + ' ' + xRotation + ',' + largeArc + ',' + sweep + ' ' + x2 + ',' + y2;
      });

      node
        .attr('cx', function(d) { return d['x'] = Math.max(5, Math.min(width - 5, d['x'])); })
        .attr('cy', function(d) { return d['y'] = Math.max(5, Math.min(height - 5, d['y'])); });
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
