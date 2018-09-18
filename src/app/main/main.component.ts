import { Component, OnInit } from '@angular/core';
import {WebServiceService} from '../guard/web-service.service';
import {AddCustomerComponent} from '../dialog/add-customer/add-customer.component';
import {MatDialog} from '@angular/material';
import {ExpAlertComponent} from '../dialog/exp-alert/exp-alert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public dateTime: Date = new Date();
    userName: string;
    userType: string;
    photo: string;
    show = false;
    data: any;
    access_mode: any;
    alert_time: number;
    constructor(private req: WebServiceService, public dialog: MatDialog) {
        this.access_mode = sessionStorage.getItem('access');
        setInterval(() => {
            this.dateTime = new Date();
        }, 1000);
        setInterval(() => {
            if (this.show === false) {
                this.show = true;
                this.req.getProductListDate().subscribe(
                    res => {
                        if (res.length > 0) {
                            const dialogRef = this.dialog.open(ExpAlertComponent, {
                                width: '600px',
                                data: {name: res, msg: 'Please Remove The products in you shop.'}
                            });
                            dialogRef.afterClosed().subscribe(result => {
                                this.show = false;
                            });
                        }
                    }
                );
            }
        }, 1000 * 60 * 5);
        this.req.getMainInfo().subscribe(
            res => {
                this.userName = res['full_name'];
                this.userType = res['ut_name'];
                this.photo = res['photo'];
            }
        );
    }
  ngOnInit() {
  }

}
