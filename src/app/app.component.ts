import { Component, OnInit } from '@angular/core';
import { MapChart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { PkGeoJSON } from './pkmap';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pak-covid19-client';
  map: MapChart = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.draw(PkGeoJSON);
  }

  draw(pkMapData) {
    const data: any = [
      ['pk-sd', 0],
      ['pk-ba', 1],
      ['pk-jk', 2],
      ['pk-na', 3],
      ['pk-nw', 4],
      ['pk-ta', 5],
      ['pk-is', 6],
      ['pk-pb', 7],
      ['pk-ok', 3]
    ];
    const series: any = [
      {
        data,
        name: 'Random data',
        states: {
          hover: {
            color: '#BADA55'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        }
      }
    ];
    this.map = new MapChart({
      chart: {
        map: pkMapData,
      },
      title: {
        text: 'Pakistan'
      },
      subtitle: {
        text: 'Novel COVID-19 <a href="http://code.highcharts.com/mapdata/countries/pk/pk-all.js">Pakistan</a>'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      colorAxis: {
        min: 0
      },
      series
    });
  }

}