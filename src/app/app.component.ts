import { Component, OnInit } from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { PkGeoJSON } from './pkmap';
import * as Highcharts from 'highcharts';

declare var require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pak-covid19-client';
  map: MapChart = null;
  pchart: Chart = null;
  tchart: Chart = null;
  barChart: Chart = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.drawMap(PkGeoJSON);
    // const pkMapData = require('@highcharts/map-collection/countries/pk/pk-all.geo.json');
    this.generateProvinceStatsDonut();
    this.generateTrovinceStatsDonut();
    // this.generateStackedBarChart();
  }

  generateStackedBarChart() {
    // this.barChart = new Chart({
    //   chart: {
    //     type: 'column'
    //   },
    //   title: {
    //     text: 'Stacked column chart'
    //   },
    //   xAxis: {
    //     categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    //   },
    //   yAxis: {
    //     min: 0,
    //     title: {
    //       text: 'Total fruit consumption'
    //     },
    //     stackLabels: {
    //       enabled: true,
    //       style: {
    //         fontWeight: 'bold',
    //         color: ( // theme
    //           Highcharts.defaultOptions.title.style &&
    //           Highcharts.defaultOptions.title.style.color
    //         ) || 'gray'
    //       }
    //     }
    //   },
    //   legend: {
    //     align: 'right',
    //     x: -30,
    //     verticalAlign: 'top',
    //     y: 25,
    //     floating: true,
    //     backgroundColor:
    //       Highcharts.defaultOptions.legend.backgroundColor || 'white',
    //     borderColor: '#CCC',
    //     borderWidth: 1,
    //     shadow: false
    //   },
    //   tooltip: {
    //     headerFormat: '<b>{point.x}</b><br/>',
    //     pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    //   },
    //   plotOptions: {
    //     column: {
    //       stacking: 'normal',
    //       dataLabels: {
    //         enabled: true
    //       }
    //     }
    //   },
    //   series: [{
    //     name: 'John',
    //     data: [5, 3, 4, 7, 2]
    //   }, {
    //     name: 'Jane',
    //     data: [2, 2, 3, 2, 1]
    //   }, {
    //     name: 'Joe',
    //     data: [3, 4, 4, 2, 5]
    //   }]
    // });
  }

  generateTrovinceStatsDonut() {
    this.tchart = new Chart({
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Hospital Updates'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '20%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Hospital Updates',
        data: [
          ['Still Admitted', 25],
          ['Discharged', 3],
          ['Expired', 0],
        ]
      }],
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    });
  }

  generateProvinceStatsDonut() {
    this.pchart = new Chart({
      chart: {
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Confirmed Cases'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%'],
          size: '45%',
          innerSize: '20%'
        }
      },
      series: [{
        type: 'pie',
        name: 'Confirmed Cases',
        data: [
          ['ICT', 3],
          ['Punjab', 0],
          ['Sindh', 16],
          ['KP', 0],
          ['KPTD', 0],
          ['Balochistan', 6],
          ['AJK', 0],
          ['GB', 3]
        ]
      }],
      credits: {
        enabled: false
      },
      exporting: { enabled: false }
    });
  }

  drawMap(pkMapData) {
    const data: any = [
      ['pk-sd', 16],
      ['pk-ba', 6],
      ['pk-jk', 0],
      ['pk-na', 3],
      ['pk-nw', 0],
      ['pk-ta', 0],
      ['pk-is', 3],
      ['pk-pb', 0],
      ['pk-ok', 0]
    ];
    const series: any = [
      {
        data,
        name: 'Confirmed Cases',
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
        map: pkMapData
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
          verticalAlign: 'bottom',
          align: 'right'
        }
      },
      colorAxis: {
        min: 0
      },
      series,
      credits: {
        enabled: false
      },
      exporting: { enabled: true },
    });
  }

}