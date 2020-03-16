import { Component, OnInit } from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';
import { HttpClient } from '@angular/common/http';
import { PkGeoJSON } from '../../pkmap';

declare var require: any;
@Component({
  selector: 'app-public-dashboard',
  templateUrl: './public-dashboard.component.html',
  styleUrls: ['./public-dashboard.component.css']
})
export class PublicDashboardComponent implements OnInit {

  title = 'pak-covid19-client';
  map: MapChart = null;
  pchart: Chart = null;
  tchart: Chart = null;
  linechart: Chart = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.drawMap(PkGeoJSON);
    // const pkMapData = require('@highcharts/map-collection/countries/pk/pk-all.geo.json');
    this.generateProvinceStatsDonut();
    this.generateTrovinceStatsDonut();
    this.generateLineGraph();
  }

  generateDates() {
    const startDate = new Date('2020-03-07');
  }

  generateLineGraph() {
    this.linechart = new Chart({
      title: {
        text: 'Cases Timeline'
      },
      subtitle: {
        text: ''
      },
      yAxis: {
        title: {
          text: 'Number of Positive cases'
        }
      },
      xAxis: {
        // type: 'datetime',
        categories: ['07/03/2020', '09/03/2020', '10/03/2020', '11/03/2020', 
                      '12/03/2020', '13/03/2020', '14/03/2020', '15/03/2020',
                      '16/03/2020'],
        accessibility: {
          rangeDescription: 'Range: 2020'
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      // plotOptions: {
      //   series: {
      //     label: {
      //       connectorAllowed: false
      //     },
      //     pointStart: 2010
      //   }
      // },

      // plotOptions: {
      //   series: {
      //     pointStart: Date.UTC(2020, 3, 7),
      //     pointInterval: 3600 * 1000
      //   }
      // },

      series: [{
        name: 'Positive Cases',
        type: 'line',
        data: [6, 7, 16, 19, 20, 21, 28, 31, 53]
      }],
      credits: {
        enabled: false
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }

    });
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
          innerSize: '20%',
          colors: ['#2f7ed8', '#27ae60', '#27ae60']
        }
      },
      series: [{
        type: 'pie',
        name: 'Hospital Updates',
        data: [
          ['Still Admitted', 50],
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
          ['ICT', 4],
          ['Punjab', 1],
          ['Sindh', 34],
          ['KP', 0],
          ['KPTD', 0],
          ['Balochistan', 5],
          ['AJK', 0],
          ['GB', 3],
          ['Mobile Lab Taftan', 6]
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
      ['pk-sd', 34],
      ['pk-ba', 6],
      ['pk-jk', 0],
      ['pk-na', 3],
      ['pk-nw', 0],
      ['pk-ta', 0],
      ['pk-is', 4],
      ['pk-pb', 1],
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
