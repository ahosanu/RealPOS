import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {AddcategoryComponent} from '../dialog/addcategory/addcategory.component';
import {AddProductComponent} from '../dialog/add-product/add-product.component';
import {WebServiceService} from '../guard/web-service.service';
import {ConfirmComponent} from '../dialog/confirm/confirm.component';
import {BarcodePrintComponent} from '../dialog/barcode-print/barcode-print.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    displayedColumns: string[] = ['number', 'pro_name', 'pro_id', 'buy_price', 'sale_pro',
        'pro_unit', 'pro_exp_date', 'category', 'discount', 'option'];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(public dialog: MatDialog, private req: WebServiceService) {
        this.LodingTable();
    }

    ngOnInit() {
    }
    showDate(stamp: number) {
        return new Date(stamp * 1000);
    }
    addNew() {
        const dialogRef = this.dialog.open(AddProductComponent, {
            width: '600px',
            data: {title: 'Add New', pro_name: '',
                buy_price: '', sale_price: '', unit: '',
                mk_date: null, exp_date: null, pro_id: '-1'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    PrintBarcode(name: string, price: string, id: string) {
        this.req.CreateBarcode(id, name, price).subscribe(
            res => {
                console.log(res);
               const dialogRef = this.dialog.open(BarcodePrintComponent, {
                    width: '600px',
                    data: {code: res.msg}
                });
                dialogRef.afterClosed().subscribe(
                    resx => {
                        this.req.DeleteBarcode(res.msg).subscribe(
                            nx => {
                                console.log(nx);
                            }
                        );
                    }
                );
            });
    }

    UpdateNew(
        pro_name: string,
        buy_price: number,
        sale_price: number,
        unit: number,
        mak_date: string,
        exp_date: string,
        pro_id: number
    ) {
        const dialogRef = this.dialog.open(AddProductComponent, {
            width: '600px',
            data: {title: 'Edit or Update',
                pro_name: pro_name,
                buy_price: buy_price,
                sale_price: sale_price,
                unit: unit,
                mk_date: mak_date,
                exp_date: exp_date,
                pro_id: pro_id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.LodingTable();
        });
    }
    LodingTable() {
        /*this.Config.Loading = true;*/
        this.req.getProductList().subscribe(
            res => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                /*this.Config.Loading = false;*/
            });
    }
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        const re = /\//gi;
        if (filterValue.search(re) === -1 ) {
            this.dataSource.filter = filterValue;
        } else {
            const dat = filterValue.split('/');
            if (dat[2] !== undefined) {
                this.dataSource.filter = (new Date(dat[1] + '/' + dat[0] + '/' + dat[2]).getTime() / 1000).toString();
            } else {
                this.dataSource.filter = (new Date().getTime() / 1000).toString();
            }
        }
    }

    DeletePro(pro_id: number | string, name: string) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '600px',
            data: {name: name, msg: 'Are You Remove This Item?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.req.RemovePro(pro_id).subscribe(
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

