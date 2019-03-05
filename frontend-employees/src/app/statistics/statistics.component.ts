import { Component, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent implements OnInit {

    private statistics;

  constructor(private employeesService: EmployeesService) { }
  
  ngOnInit() {
      this.employeesService.statistics('detail').subscribe(results => {
          this.statistics = results;
          this.gender([this.statistics.data.qntMale, this.statistics.data.qntFemale]);
          this.salaries(this.statistics.salarys);
          console.log(results);
      }, error => {
          console.log(error);
      })
  }

  public gender(data):void{

    var ctx = document.getElementById("employees-gender");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Masculino", "Feminino"],
            datasets: [{
                label: 'Total',
                data: data,
                backgroundColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 15, 235, 1)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 15, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        stepSize: 1,
                        beginAtZero:true
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });

  }

  public salaries(data: any[]):void{
    let salaries: string[] = [];
    let qntEmployees: number[] = [];

    [... data].forEach(salary => {
        salaries.push(`R$ ${salary.salary}`),
        qntEmployees.push(salary.qntEmployees)
    })

    var ctx = document.getElementById("salaries");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salaries,
                datasets: [{
                    label: "Pessoas ",
                    data: qntEmployees,
                    borderColor: "#1B5005",
                    backgroundColor: "rgba(153,255,51, 0)",
                    borderWidth: 5,
                }],
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 1,
                            stepSize: 1,
                        }
                    }],
                },
            }
        });
  }

}
