import {Component, OnInit, ViewChild} from '@angular/core';
import {AddEmployeeComponent} from '../dialog/add-employee/add-employee.component';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddCustomerComponent} from '../dialog/add-customer/add-customer.component';
import {WebServiceService} from '../guard/web-service.service';
import {ConfirmComponent} from '../dialog/confirm/confirm.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    get paginator(): MatPaginator {
        return this._paginator;
    }

    set paginator(value: MatPaginator) {
        this._paginator = value;
    }
    displayedColumns: string[] = ['number', 'con_name', 'info', 'user_type' , 'con_photo', 'option'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    MAIN_URL = '';
    constructor(public dialog: MatDialog, private req: WebServiceService) {
        this.LodingTable();
        this.MAIN_URL = this.req.MAIN_URL;
    }

    ngOnInit() {}
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    addNew() {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
            width: '600px',
            data: {title: 'Add New', name: '', id: -1, mobile: '', email: '', photo: '', address: '', user: '', ut_id: -1}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
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
    UpdateUser(name: string, id: number, mobile: string, email: string, photo: string, address: string, user: string, ut_id: string) {
        const dialogRef = this.dialog.open(AddEmployeeComponent, {
            width: '600px',
            data: {title: 'Update Or Edit', name: name, id: id, mobile: mobile, email: email,
                photo: photo, address: address, user: user, ut_id: ut_id}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    LodingTable() {
        /*this.Config.Loading = true;*/
        this.req.getEmployeeList().subscribe(
            res => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                /*this.Config.Loading = false;*/
            });
    }
}
