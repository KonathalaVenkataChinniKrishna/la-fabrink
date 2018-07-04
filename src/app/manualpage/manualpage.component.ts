import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';

import 'd3';
import 'nvd3';
import {NvD3Module} from 'ng2-nvd3';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-manualpage',
  templateUrl: './manualpage.component.html',
  styleUrls: ['./manualpage.component.scss']
})
export class ManualpageComponent implements OnInit  {

  public totalCount = 0;

  constructor(public sharedModule: SharedModule) {}

  ngOnInit () {
    this.sharedModule.getQuestions().subscribe(data => {
      // console.log(data);
      let response = Array(JSON.parse(data['_body']));
      response = response[0];
      // console.log(response);
      const elem: HTMLDivElement = <HTMLDivElement> document.getElementById('manualQue');
      let iter = 1;
      for (let i = 0; i < response.length; i++) {
        // console.log(response[i]);
        if (response[i].trained === 0) {
          elem.innerHTML += '<div class="row">'
          + '<div class="col-lg-4" style="text-align: right;">'
          + '        <p id="que' + iter + '" class="question" style="color: white; display: flex; justify-content:center; align-content:center; flex-direction:column;height: 6vh;font-size: large; background-color: transparent; border-color: transparent" align="right">' + response[i].queryText + '</p>'
          + '</div>'
          + '<div class="col-lg-6">'
          + ' <textarea id="ans' + iter + '" class="form-control" [(ngModel)]="usermsg" id="usermsg" rows="2" cols="70" placeholder="Répondre s\'il vous plaît ..."></textarea>'
          + '</div>'
          + '</div>';
          iter++;
          this.totalCount++;
        }
      }
    });
  }

  public submitAnswers() {
    let submitstr = '[';
    for (let i = 1; i <= this.totalCount; i++) {
      const tmpstr = document.getElementById('ans' + i)['value'];
      // console.log('Temp Strring : ' + tmpstr);
      if (!(tmpstr === null) && !(tmpstr === '') && !(tmpstr.trim() === '')) {
        submitstr += '{"queryText" : "' + document.getElementById('que' + i).innerText + '",'
                      + '"answer" : "' + document.getElementById('ans' + i)['value'] + '"}';

      }
    }
    submitstr += ']';
    // console.log(submitstr);
    console.log(JSON.parse(submitstr));
    this.sharedModule.postAnswers(submitstr).subscribe();
  }
}
