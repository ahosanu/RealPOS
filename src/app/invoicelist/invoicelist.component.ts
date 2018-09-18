import {Component, OnInit, ViewChild} from '@angular/core';
import {AddCustomerComponent} from '../dialog/add-customer/add-customer.component';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {WebServiceService} from '../guard/web-service.service';
import {AddEmployeeComponent} from '../dialog/add-employee/add-employee.component';
import {RePrintComponent} from '../dialog/re-print/re-print.component';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent implements OnInit {
    get paginator(): MatPaginator {
        return this._paginator;
    }

    set paginator(value: MatPaginator) {
        this._paginator = value;
    }
    displayedColumns: string[] = ['number', 'name', 'info', 'date', 'option'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    constructor(private req: WebServiceService, public dialog: MatDialog) {
        this.LodingTable();
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    RePrint(name: string, address: string, id: number, date: number, camount: number, pay: number, se: string ) {
        const dialogRef = this.dialog.open(RePrintComponent, {
            width: '400px',
            data: {Name: name, address: address, id: id, date: date, change_amount: camount, pay_on: pay, se: 'rp-' + date % 1000000}
        });
        dialogRef.afterClosed();
    }
    ngOnInit() {}
    LodingTable() {
        /*this.Config.Loading = true;*/
        this.req.getInvoiceList().subscribe(
            res => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                /*this.Config.Loading = false;*/
            });
    }
}

