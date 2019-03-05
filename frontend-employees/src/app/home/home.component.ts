import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EmployeesService } from '../services/employees.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  private statistics;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.statistics('').subscribe(results => {
      this.statistics = results[0];
      let data = [results[0].totEnglish, results[0].totUniversity, results[0].lessOr30,results[0].married , results[0].greater30]
      this.initGraphic(data);
    });
  }

  initGraphic(data){
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: [" Inglês", " Superior Completo", " Casados", " Até 30 Anos", " ACima De 30 Anos"],
          datasets: [{
              label: ' Quantidade de Pessoas',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }],
          xAxes: [{
            ticks: {
              min: 0,
              stepSize: 1,
            }
            }],
      },
        legend: {
          display: false,
          labels: {
              fontColor: 'rgb(255, 255, 255)'
          }
        },
        title: {
          display: true,
          text: 'Estatisticas Da Sua Empresa',
        }
      }
    });
  }

}
