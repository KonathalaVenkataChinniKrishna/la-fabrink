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
import { NvD3Module } from 'ng2-nvd3';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
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
