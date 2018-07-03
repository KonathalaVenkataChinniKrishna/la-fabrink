import { Component, AfterViewInit, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';
import { GridApi } from 'ag-grid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  graphData: any;

  private api: GridApi;

  options: any;
  data: any;
  @ViewChild('nvd3') nvd3;

  columnDefs = [
    {headerName: 'Message Initiator', field: 'Facebook_Initiator', width: 350 },
    {headerName: 'Jeune Entrepreneur', field: 'Young_Entrepreneur', width: 350 },
    {headerName: 'Message', field: 'Message', width: 350 }
];

rowData: any[];

  constructor(public sharedModule: SharedModule) {
    this.sharedModule.getDashboardData().subscribe(data => {
      // console.log(JSON.parse(data['_body']));
      this.rowData = JSON.parse(data['_body'])['response'];
      this.api.setRowData(this.rowData);
      this.api.refreshCells();
    });
  }

  private onReady(params) {
    this.api = params.api;
  }
}
