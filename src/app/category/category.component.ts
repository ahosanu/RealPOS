import {Component, OnInit, ViewChild} from '@angular/core';
import {AddCustomerComponent} from '../dialog/add-customer/add-customer.component';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddcategoryComponent} from '../dialog/addcategory/addcategory.component';
import {WebServiceService} from '../guard/web-service.service';
import {ConfirmComponent} from '../dialog/confirm/confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    get paginator(): MatPaginator {
        return this._paginator;
    }

    set paginator(value: MatPaginator) {
        this._paginator = value;
    }
    displayedColumns: string[] = ['number', 'name', 'total', 'discount', 'option'];
    dataSource: MatTableDataSource<PeriodicElement>;
    @ViewChild(MatPaginator) private _paginator: MatPaginator;

    constructor(public dialog: MatDialog, private req: WebServiceService) {
        this.LodingTable();
    }

    ngOnInit() {
    }
    addNew() {
        const dialogRef = this.dialog.open(AddcategoryComponent, {
            width: '600px',
            data: {title: 'Add New', discount: '', name: '', id: null}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    EditNew(id: number, name: string, discount: number) {
        const dialogRef = this.dialog.open(AddcategoryComponent, {
            width: '600px',
            data: {title: 'Update Or Edit', discount: discount, name: name, id: id}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    DeleteCat(ca_id: number | string, name: string) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '600px',
            data: {name: 'If You remove this (' + name + ') Category. Then You lost your all item in this category.',
                msg: 'Are You Remove This Item?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.req.RemoveCat(ca_id).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                            this.LodingTable();
                        }
                    }
                );
            }
        });
    }
    LodingTable() {
        /*this.Config.Loading = true;*/
        this.req.getCategory().subscribe(
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
}
export interface PeriodicElement {
    number: number;
    ca_name: string;
    ca_id: string;
    total_item: number;
    discount: string;
}

