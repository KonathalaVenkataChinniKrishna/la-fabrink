import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BargraphComponent } from './bargraph/bargraph.component';
import { NvD3Module } from 'ng2-nvd3';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { InteractionpageComponent } from './interactionpage/interactionpage.component';
import { InteractionpagedendoComponent } from './interactionpagedendo/interactionpagedendo.component';
import { ChatbotpageComponent } from './chatbotpage/chatbotpage.component';
import { IframeComponent } from './iframepage/iframe.component';
import { BargraphcontextComponent } from './bargraphcontext/bargraphcontext.component';
import { ChatbotbothpageComponent } from './chatbotbothpage/chatbotbothpage.component';
import { ManualpageComponent } from './manualpage/manualpage.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BargraphComponent,
    LandingpageComponent,
    InteractionpageComponent,
    InteractionpagedendoComponent,
    ChatbotpageComponent,
    IframeComponent,
    BargraphcontextComponent,
    ChatbotbothpageComponent,
    ManualpageComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    SharedModule,
    NvD3Module,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot({}),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
