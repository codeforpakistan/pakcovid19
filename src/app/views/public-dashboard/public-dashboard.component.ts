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
        accessibility: {
          rangeDescription: 'Range: March 2020'
        }
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
        data: [6, 7, 16, 19, 20, 21, 28, 31]
      }],

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
