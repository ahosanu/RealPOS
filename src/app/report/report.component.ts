import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../guard/web-service.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    total_sale: number;
    total_profit: number;
    total_customer: number;
    total_item: number;
    data_row: any;
    start_date = new FormControl();
    End_date = new FormControl();
  displayedColumns: string[] = ['number', 'pro_name', 'buy_price', 'sale_pro',
      'pro_unit_sale_unit', 'pro_buy_unit', 'pro_unit', 'pro_profit', 'pro_exp_date'];
  dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private req: WebServiceService, public snackBar: MatSnackBar) {
      this.loadTable();
  }

  ngOnInit() {
  }
  loadTable() {
      this.req.getReportProductList().subscribe(
          res => {
              this.data_row = res;
              this.dataSource = new MatTableDataSource(res);
              this.dataSource.paginator = this.paginator;
              /*this.Config.Loading = false;*/
          });
      this.req.Dashboard().subscribe(
          res => {
              this.total_customer = res['customer'];
              this.total_item = res['total_item'];
              this.total_profit = Math.ceil(res['profit']);
              this.total_sale = Math.ceil(res['sale_price']);
          }
      );
  }
  loadTable_date() {
      console.log(this.start_date.value.getTime() / 1000 + ' - ' + this.End_date.value.getTime() / 1000);
      if (this.start_date.value.getTime() <= this.End_date.value.getTime()) {
          this.req.getReportProductList_date((this.start_date.value.getTime() / 1000).toString(),
              (this.End_date.value.getTime() / 1000).toString()).subscribe(
              res => {
                  this.data_row = res;
                  this.dataSource = new MatTableDataSource(res);
                  this.dataSource.paginator = this.paginator;
                  /*this.Config.Loading = false;*/
              });
          this.req.Dashboard_date((this.start_date.value.getTime() / 1000).toString(),
              (this.End_date.value.getTime() / 1000).toString()).subscribe(
              res => {
                  this.total_customer = res['customer'];
                  this.total_item = res['total_item'];
                  this.total_profit = Math.ceil(res['profit']);
                  this.total_sale = Math.ceil(res['sale_price']);
              }
          );
      } else {
          this.snackBar.open('Please Enter Correct Date Range', 'Close', {
              duration: 2000,
          });
      }
  }
}

