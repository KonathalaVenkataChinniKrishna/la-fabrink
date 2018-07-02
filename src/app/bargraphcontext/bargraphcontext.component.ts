import { Component, AfterViewInit, ViewChild } from '@angular/core';

import 'd3';
import 'nvd3';
import {NvD3Module} from 'ng2-nvd3';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-bargraphcontext',
  templateUrl: './bargraphcontext.component.html',
  styleUrls: ['./bargraphcontext.component.scss']
})
export class BargraphcontextComponent {

  graphData: any;

  options: any;
  data: any;
  @ViewChild('nvd3') nvd3;

  columnDefs = [
    {headerName: 'User', field: 'user', width: 250 },
    {headerName: 'Type', field: 'type' },
    {headerName: 'Counter Part', field: 'counter', width: 250 },
    {headerName: 'Data', field: 'data' },
    {headerName: 'Time Stamp', field: 'time'}
];

rowData = [
    { user: 'C Aravindh', type: 'Message', counter: 'Konathala Venkata', data: 'Hi Buddy', time: '16-06-18 14:22:34' },
    { user: 'C Aravindh', type: 'Comment', counter: 'Konathala Venkata', data: 'Awesome', time: '16-06-18 15:19:34' },
    { user: 'Konathala Venkata', type: 'Message', counter: 'C Aravindh', data: 'Hello There', time: '16-06-18 14:23:50' },
    { user: 'C Aravindh', type: 'Message', counter: 'Konathala Venkata', data: 'How you doing??', time: '16-06-18 14:24:34' },
    { user: 'Konathala Venkata', type: 'Message', counter: 'C Aravindh', data: 'Good, you?', time: '16-06-18 14:25:34' },
    { user: 'C Aravindh', type: 'Message', counter: 'Konathala Venkata', data: 'Good. Thanks!', time: '16-06-18 14:26:34' }
];

  constructor(public sharedModule: SharedModule) {
    this.graphData = {
        nodes: [
            {data: {id: 'j', name: 'Jerry', faveColor: '#6FB1FC', faveShape: 'triangle'}},
            {data: {id: 'e', name: 'Elaine', faveColor: '#EDA1ED', faveShape: 'ellipse'}},
            {data: {id: 'k', name: 'Kramer', faveColor: '#86B342', faveShape: 'octagon'}},
            {data: {id: 'g', name: 'George', faveColor: '#F5A45D', faveShape: 'rectangle'}}
        ],
        edges: [
            {data: {source: 'j', target: 'e', faveColor: '#6FB1FC'}},
            {data: {source: 'j', target: 'k', faveColor: '#6FB1FC'}},
            {data: {source: 'j', target: 'g', faveColor: '#6FB1FC'}},

            {data: {source: 'e', target: 'j', faveColor: '#EDA1ED'}},
            {data: {source: 'e', target: 'k', faveColor: '#EDA1ED'}},

            {data: {source: 'k', target: 'j', faveColor: '#86B342'}},
            {data: {source: 'k', target: 'e', faveColor: '#86B342'}},
            {data: {source: 'k', target: 'g', faveColor: '#86B342'}},

            {data: {source: 'g', target: 'j', faveColor: '#F5A45D'}}
        ]
    };
    const colorCodes = ['yellow', 'green', 'blue', 'red', 'pink'];
    this.options = {
      chart: {
        type: 'multiBarHorizontalChart',
        height: 500,
        barColor : function(d) {return colorCodes[d.value%5]},
        // color : ['red','green','red','yellow'] ,
        margin : {
          top: 80,
          right: 50,
          bottom: 180,
          left: 200
        },
        x: function(d){return d.label; },
        y: function(d){return d.value; },
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.0f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: '',
          rotateLabels: -90,
          axisLabelDistance: -10
        },
        yAxis: {
          axisLabel: 'Context Counts of Young Entrepreneures',
          axisLabelDistance: 10  
        }
      }
    };

    this.data = [
      {
        key: 'Context Hits',
        values: []
      }
    ];

    const mysvg = d3.select('body');
    this.sharedModule.getContextCountsData().subscribe(data => {

      const tmpData = JSON.parse(data['_body']);

      Object.keys(tmpData).forEach((key) => {
        // console.log('Key : ' + key + ', Value : ' + tmpData[key])
        // this.data.values.add({label : key, value : tmpData[key]})
        this.data[0]['values'].push({'label' : key, 'value' : +tmpData[key]});
      });
      console.log(this.data);
      this.nvd3.chart.update();
    });
  }
}
