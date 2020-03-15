import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as highmaps from 'highcharts/modules/map.src';
import { PublicDashboardComponent } from './views/public-dashboard/public-dashboard.component';
import { WorldDashboardComponent } from './views/world-dashboard/world-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicDashboardComponent,
    WorldDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, highmaps ] } // add as factory to your providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
