import { Component, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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

  constructor() {
  }

  ngOnInit() {}
}
