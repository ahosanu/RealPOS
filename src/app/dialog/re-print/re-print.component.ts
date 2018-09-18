import {Component, Inject, OnInit} from '@angular/core';
import {WebServiceService} from '../../guard/web-service.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-re-print',
  templateUrl: './re-print.component.html',
  styleUrls: ['./re-print.component.scss']
})
export class RePrintComponent implements OnInit {
    pay_by = 1;
    pay_on = '';
    change_amount = 0;
    Total_amount = 0;
    discount = 0;
    vat_rate = 15;
    dataInvoice = [];
    vat = 0;
    full_name = '';
    invoice_se = '';
    time: number;
    total_unit: number;
    address = '';
    id = '';
  constructor(public dialogRef: MatDialogRef<RePrintComponent>,
              private req: WebServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.address = data.address;
      this.full_name = data.Name;
      this.id = data.id;
      this.time = data.date * 1000;
      this.change_amount = data.change_amount;
      this.pay_on = data.pay_on;
      this.invoice_se = data.se;
      this.req.getPrintList(data.id).subscribe(
          res => {
              this.dataInvoice = res;
              for (const dat of this.dataInvoice) {
                  this.total_unit = +dat.unit;
                  this.Total_amount = +(dat.unit * dat.sale_price);
                  this.discount += ((dat.unit * dat.sale_price) * ((dat.discount) / 100));
              }
              this.vat = this.Total_amount * (this.vat_rate / 100) - this.discount;
          });
  }

  ngOnInit() {
  }
    onClose() {
        this.dialogRef.close('Close');
    }
}
