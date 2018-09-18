import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {WebServiceService} from '../../guard/web-service.service';
import {DatePipe} from '@angular/common';
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
    title: string;
    pro_id: number;
    pro_name = new FormControl('', [Validators.required, Validators.minLength(4)]);
    buy_price = new FormControl('', [Validators.required]);
    sale_price = new FormControl('', [Validators.required]);
    unit = new FormControl('', [Validators.required]);
    discount = new FormControl();
    mak_date = new FormControl();
    exp_date = new FormControl();
    TSelect;
    userTypes;
    checked = false;
    constructor(public dialogRef: MatDialogRef<AddProductComponent>, private req: WebServiceService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.pro_id = data['pro_id'];
        this.title = data['title'];
        this.pro_name.setValue(data['pro_name']);
        this.buy_price.setValue(data['buy_price']);
        this.sale_price.setValue(data['sale_price']);
        this.unit.setValue(data['unit']);
        console.log(data['mk_date']);
        if (data['mk_date'] !== null && data['exp_date'] !== null) {
            this.checked = true;
            this.mak_date.setValue(data['mk_date'] === null ? '' : new Date(data['mk_date'] * 1000));
            this.exp_date.setValue(data['exp_date'] === null ? '' : new Date(data['exp_date'] * 1000));
        }
        this.req.getCategory().subscribe(
            res => {
                this.userTypes = res;
                this.TSelect = this.userTypes[0].ca_id;
            });
    }

    ngOnInit() {
    }

    onSubmit(ca_id: string) {
        if (this.pro_name.valid && this.unit.valid && this.buy_price.valid && this.sale_price.valid) {
            const _FileData: FormData = new FormData();
            _FileData.append('pro_name', this.pro_name.value.trim());
            _FileData.append('unit', this.unit.value.toString());
            _FileData.append('buy_price', this.buy_price.value.toString());
            _FileData.append('sale_price', this.sale_price.value.toString());
            if (this.checked === true) {
                _FileData.append('mk_date', (new Date(this.mak_date.value.toString()).getTime() / 1000).toString());
                _FileData.append('exp_date', (new Date(this.exp_date.value.toString()).getTime() / 1000).toString());
            } else {
                _FileData.append('checked', 'no');
            }
            _FileData.append('ca_id', ca_id);
            if (this.pro_id < 0) {
                this.req.AddProduct(_FileData).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        }
                    });
            } else {
                if (this.checked === false) {
                    _FileData.append('mk_date', 'null');
                    _FileData.append('exp_date', 'null');
                }

                _FileData.append('pro_id', this.pro_id.toString());
                this.req.UpdateProduct(_FileData).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        } else {
                            console.log(res);
                        }
                    });
            }
        } else {
            console.log('not');
        }
    }

    onClose() {
        this.dialogRef.close('Close');
    }

    getErrorMessage() {
        return this.pro_name.hasError('required') ? 'You must enter a value' :
            this.pro_name.hasError('minlength') ? 'Enter 4 character Name' :
                '';
    }
    getErrorMessageAmountsale() {
        return this.sale_price.hasError('required') ? 'You must enter a value' :
            this.sale_price.hasError('minlength') ? 'Wrong Amount' :
                '';
    }

    getErrorMessageAmountbuy() {
        return this.buy_price.hasError('required') ? 'You must enter a value' :
            this.buy_price.hasError('minlength') ? 'Wrong Amount' :
                '';
    }
    getErrorMessageunit() {
        return this.unit.hasError('required') ? 'You must enter a value' :
            this.unit.hasError('minlength') ? 'Wrong Unit input' :
                '';
    }
}
