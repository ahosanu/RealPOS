import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddEmployeeComponent} from '../dialog/add-employee/add-employee.component';
import {AddCustomerComponent} from '../dialog/add-customer/add-customer.component';
import {WebServiceService} from '../guard/web-service.service';
import {ConfirmComponent} from '../dialog/confirm/confirm.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    MAIN_URL: string;

get paginator(): MatPaginator {
    return this._paginator;
}

set paginator(value: MatPaginator) {
    this._paginator = value;
}
displayedColumns: string[] = ['number', 'con_name', 'info', 'con_photo', 'option'];
dataSource: MatTableDataSource<any>;
@ViewChild(MatPaginator) private _paginator: MatPaginator;
constructor(public dialog: MatDialog, public req: WebServiceService) {
    this.LodingTable();
    this.MAIN_URL = this.req.MAIN_URL;
}

ngOnInit() {
}
    addNew() {
        const dialogRef = this.dialog.open(AddCustomerComponent, {
            width: '600px',
            data: {title: 'Add New', name: '', id: -1, mobile: '', email: '', photo: '', address: ''}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    UpdateNew(name: string, id: number, mobile: string, email: string, photo: string, address: string) {
        const dialogRef = this.dialog.open(AddCustomerComponent, {
            width: '600px',
            data: {title: 'Update & Edit', name: name, id: id, mobile: mobile, email: email, photo: photo, address: address}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }

LodingTable() {
    /*this.Config.Loading = true;*/
    this.req.getUserList().subscribe(
        res => {
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            /*this.Config.Loading = false;*/
        });
}

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    DeleteUser(name: any, id: any) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '600px',
            data: {name: name,
                msg: 'Are You Remove This Item?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.req.DeleteUser(id).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                            this.LodingTable();
                        }
                    }
                );
            }
        });
    }
}

