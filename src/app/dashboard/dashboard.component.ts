import { Component, AfterViewInit } from '@angular/core';
import {WebServiceService} from '../guard/web-service.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    total_sale: number;
    total_profit: number;
    total_customer: number;
    total_item: number;
    type = 'line';
    data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Sale',
                data: [
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber()
                ],
                backgroundColor: 'rgba(76, 229, 221, 0.2)'
            },
            {
                label: 'Monthly Profit',
                data: [
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber(),
                    this.getRandomNumber()
                ]
            }
        ]
    };
    options = {
        responsive: true,
        title: {
            display: true,
            text: 'Monthly Graph'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    };
  constructor(private req: WebServiceService) {
      this.req.Dashboard().subscribe(
          res => {
              this.total_customer = res['customer'];
              this.total_item = res['total_item'];
              this.total_profit = Math.ceil(res['profit']);
              this.total_sale = Math.ceil(res['sale_price']);
          }
      );
  }
    getRandomNumber(): any {
        return (Math.floor(Math.random() * (999999 - 100000)) + 100) % 1000;
    }
}
