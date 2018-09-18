import { Component, OnInit } from '@angular/core';
import {WebServiceService} from '../guard/web-service.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  pay_by = 1;
  input_id = '';
  pay_on_set = '';
  change_amount = 0;
  Total_amount = 0;
  discount = 0;
  vat_rate = 15;
  dataInvoice = [];
  vat = 0;
  full_name = '';
  invoice_se = 'rp-' + new Date().getTime() % 1000000;
  time = new Date();
  total_unit: number;
  mobile = '';
  member_id =  '';
  address = '';
  Math: Math;
  constructor(private req: WebServiceService, public snackBar: MatSnackBar, private router: Router) {}
  ngOnInit() {
  }
  pay(full_name: string, mobile: string, address: string) {
      console.log(full_name);
      const _FileData: FormData = new FormData();
      _FileData.append('name', full_name.trim());
      _FileData.append('mobile', mobile.trim());
      _FileData.append('address', address.trim());
      _FileData.append('vat', this.vat_rate.toString());
      _FileData.append('pay', this.pay_by.toString());
      _FileData.append('invoice_se', this.invoice_se);
      if (this.member_id !== '') {
          _FileData.append('m_id', this.member_id.trim());
      } else {
          _FileData.append('m_id', 'no');
      }
      console.log('yes');

      _FileData.append('list', new Blob( [ JSON.stringify( this.dataInvoice ) ], { type : 'application/json' } ));
      this.req.CreateInvoice(_FileData).subscribe(
          res => {
              const last_id = res['msg'];
              console.log(last_id);
              for (const data of this.dataInvoice) {
                  this.req.AddProductList(data.pro_id, last_id, data.discount, data.unit).subscribe(
                      resq => {
                          console.log(resq);
                      }
                  );
              }
              this.pay_on_set = '';
              this.pay_by = 1;
              this.input_id = '';
              this.change_amount = 0;
              this.Total_amount = 0;
              this.discount = 0;
              this.vat_rate = 15;
              this.dataInvoice = [];
              this.vat = 0;
              this.full_name = '';
              this.mobile = '';
              this.member_id =  '';
              this.address = '';
              this.total_unit = 0;
          }
      );
  }

  loadCustomer(id: number | string | any) {
      this.member_id = id.target.value;
      if (id.keyCode === 13) {
          this.req.GetInvoiceMember(id.target.value).subscribe(
              res => {
                  try {
                      this.full_name = res[0].full_name;
                      this.address = res[0].address;
                      this.mobile = res[0].mobile;
                  } catch (any) {
                      this.member_id = '';
                      this.snackBar.open('Wrong Member ID.', 'Close', {
                          duration: 2000,
                      });
                  }
              }
          );
      }
  }
  addItem(id: any) {
      this.input_id = id.target.value;
      if (id.keyCode === 13) {
        this.req.GetInvoicePro(id.target.value).subscribe(
            res => {
              try {
                  const serve = this.dataInvoice.find(x => x.pro_id === res[0].pro_id);
                  if (serve !== undefined) {
                      this.total_unit++;
                      serve.unit++;
                  } else {
                      this.total_unit++;
                      /*console.log(id.target.value.toString());*/
                      this.dataInvoice.push({
                          number: this.dataInvoice.length + 1,
                          pro_id: res[0].pro_id,
                          pro_name: res[0].pro_name,
                          unit: 1,
                          price: res[0].sale_price,
                          discount: res[0].discount
                      });
                  }
                  this.input_id = '';
                  this.Total_amount = 0;
                  this.discount = 0;
                  for (const datax of this.dataInvoice) {
                      this.Total_amount = this.Total_amount + (datax.price * datax.unit);
                          this.discount += (datax.price * datax.unit) * (datax.discount / 100);
                  }
                  this.vat = (this.Total_amount - this.discount) * (this.vat_rate / 100);
              } catch (any) {
                  if (res['msg'] === 'exp') {
                      this.snackBar.open('Date Expired Item. This Item can sale.', 'Close', {
                          duration: 2000,
                      });
                  } else if (res['msg'] === 'no') {
                      this.snackBar.open('Item Out Of Stock.', 'Close', {
                          duration: 2000,
                      });
                  } else {
                      this.snackBar.open('Item Not Fount.', 'Close', {
                          duration: 2000,
                      });
                  }
              }
            }
        );
      }
  }
    onKey(event: any) {
        this.pay_on_set = event.target.value;
        this.change_amount = (this.Total_amount - this.discount + this.vat - event.target.value);
    }
}

