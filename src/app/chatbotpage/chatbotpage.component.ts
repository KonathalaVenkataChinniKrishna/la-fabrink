import { Component, AfterViewInit, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as $ from 'jquery';
import * as shape from 'd3-shape';
import { colorSets  } from '@swimlane/ngx-charts/release/utils/color-sets';
import { SharedModule } from '../shared/shared.module';
import { GridApi } from 'ag-grid';
import { element } from 'protractor';

@Component({
  selector: 'app-chatbotpage',
  templateUrl: './chatbotpage.component.html',
  styleUrls: ['./chatbotpage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatbotpageComponent implements OnInit {

private usermsg: string;
private botmsg: string;
private botcnt = 1;

private humcnt = 1;

private convcnt = 1;

private botreply = true;

  constructor(public sharedModule: SharedModule) {
  }

  public postMessage() {
    if (this.usermsg.trim() === '') {
      return;
    }
    if (this.botreply === false) {
      return;
    }
    this.botreply = false;
        document.getElementById('botwelcome').style.display = 'none';
        const now = new Date();
        const isPM = now.getHours() >= 12;
        const isMidday = now.getHours() === 12;
        const result = document.querySelector('#result');
        const time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
            now.getMinutes(),
            now.getSeconds() || '00'].join(':') +
           (isPM ? ' PM' : 'AM');
        const elem: HTMLDivElement = <HTMLDivElement> document.getElementById('botConv');
        elem.innerHTML += '<div id="convpiece' + this.convcnt + '" class="col-lg-12 convpiece">'
        + '<div id="humimg' + this.humcnt + '" class="col-lg-1 humimg">'
        + '        <img src="./../../assets/images/avatar-mini.png" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;">'
        + '</div>'
        + '<div id="hummsg' + this.humcnt + '" class="col-lg-5 hummsg">'
        + '' + this.usermsg + ''
        + '</div>'
        + '<div class="col-lg-2 humtime">'
        + '' + time + ''
        + '</div>'
        + '<div style="clear:both"></div>'
        + '</div>';
        document.getElementById('convpiece' + this.convcnt).style.height =
        document.getElementById('hummsg' + this.humcnt).scrollHeight + 'px';
        this.convcnt++;
        this.humcnt++;
        document.getElementById('botConv').scrollTop = document.getElementById('botConv').scrollHeight;
        this.botmsg = this.usermsg;
        this.usermsg = '';
        document.getElementById('bottypingid').style.visibility = 'visible';
        setTimeout(() => {
          document.getElementById('bottypingid').style.visibility = 'hidden';
          elem.innerHTML += '<div id="convpiece' + this.convcnt + '" class="col-lg-12 convpiece">'
        + '<div id="botimg' + this.humcnt + '" class="col-lg-1 botimg">'
        + '        <img src="./../../assets/images/bot-mini.jpg" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;">'
        + '</div>'
        + '<div id="botmsg' + this.humcnt + '" class="col-lg-5 botmsg">'
        + '' + this.botmsg + ''
        + '</div>'
        + '<div class="col-lg-2 bottime">'
        + '' + time + ''
        + '</div>'
        + '<div style="clear:both"></div>'
        + '</div>';
        document.getElementById('convpiece' + this.convcnt).style.height =
        document.getElementById('botmsg' + this.humcnt).scrollHeight + 'px';
        this.convcnt++;
        this.botcnt++;
        document.getElementById('botConv').scrollTop = document.getElementById('botConv').scrollHeight;
        this.botmsg = '';
        this.botreply = true;
        }, 1500);
  }

  public ngOnInit() {
    document.getElementById('bottypingid').style.visibility = 'hidden';
    document.getElementById('usermsg').addEventListener('keypress', (e) => {
      if (e.which === 13 && !e.shiftKey && this.usermsg.trim() === '') {
        e.preventDefault();
        return;
      }
      if (e.which === 13 && !e.shiftKey && this.botreply === false) {
        e.preventDefault();
        return;
      }
      if (e.which === 13 && !e.shiftKey) {
        this.botreply = false;
        document.getElementById('botwelcome').style.display = 'none';
        e.preventDefault();
        const now = new Date();
        const isPM = now.getHours() >= 12;
        const isMidday = now.getHours() === 12;
        const result = document.querySelector('#result');
        const time = [now.getHours() - (isPM && !isMidday ? 12 : 0),
            now.getMinutes(),
            now.getSeconds() || '00'].join(':') +
           (isPM ? ' PM' : 'AM');
        const elem: HTMLDivElement = <HTMLDivElement> document.getElementById('botConv');
        elem.innerHTML += '<div id="convpiece' + this.convcnt + '" class="col-lg-12 convpiece">'
        + '<div id="humimg' + this.humcnt + '" class="col-lg-1 humimg">'
        + '        <img src="./../../assets/images/avatar-mini.png" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;">'
        + '</div>'
        + '<div id="hummsg' + this.humcnt + '" class="col-lg-5 hummsg">'
        + '' + this.usermsg + ''
        + '</div>'
        + '<div class="col-lg-2 humtime">'
        + '' + time + ''
        + '</div>'
        + '<div style="clear:both"></div>'
        + '</div>';
        document.getElementById('convpiece' + this.convcnt).style.height =
        document.getElementById('hummsg' + this.humcnt).scrollHeight + 'px';
        this.convcnt++;
        this.humcnt++;
        document.getElementById('botConv').scrollTop = document.getElementById('botConv').scrollHeight;
        this.botmsg = this.usermsg;
        this.usermsg = '';
        document.getElementById('bottypingid').style.visibility = 'visible';
        setTimeout(() => {
          document.getElementById('bottypingid').style.visibility = 'hidden';
          elem.innerHTML += '<div id="convpiece' + this.convcnt + '" class="col-lg-12 convpiece">'
        + '<div id="botimg' + this.humcnt + '" class="col-lg-1 botimg">'
        + '        <img src="./../../assets/images/bot-mini.jpg" alt="Avatar" style="width: 30px; height: 30px; border-radius: 50%;">'
        + '</div>'
        + '<div id="botmsg' + this.humcnt + '" class="col-lg-5 botmsg">'
        + '' + this.botmsg + ''
        + '</div>'
        + '<div class="col-lg-2 bottime">'
        + '' + time + ''
        + '</div>'
        + '<div style="clear:both"></div>'
        + '</div>';
        document.getElementById('convpiece' + this.convcnt).style.height =
        document.getElementById('botmsg' + this.humcnt).scrollHeight + 'px';
        this.convcnt++;
        this.botcnt++;
        document.getElementById('botConv').scrollTop = document.getElementById('botConv').scrollHeight;
        this.botmsg = '';
        this.botreply = true;
        }, 1500);
      }
    });
    // document.getElementById('convpiece1').style.height = document.getElementById('botmsg1').scrollHeight + 'px';
    // document.getElementById('convpiece2').style.height = document.getElementById('botmsg2').scrollHeight  + 'px';
    // document.getElementById('convpiece3').style.height = document.getElementById('botmsg3').scrollHeight + 'px';
    document.getElementById('botConv').scrollTop = document.getElementById('botConv').scrollHeight;
  }
}
