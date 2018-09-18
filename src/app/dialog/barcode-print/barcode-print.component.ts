import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RePrintComponent} from '../re-print/re-print.component';
import {WebServiceService} from '../../guard/web-service.service';

@Component({
  selector: 'app-barcode-print',
  templateUrl: './barcode-print.component.html',
  styleUrls: ['./barcode-print.component.scss']
})
export class BarcodePrintComponent implements OnInit {
  url: string;
  code: string;
  listnumber = [{number: 0}];
  x = 0;
  constructor(public dialogRef: MatDialogRef<RePrintComponent>,
              private req: WebServiceService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = req.MAIN_URL;
   this.code = data.code;
  }

  ngOnInit() {
  }
  onClose() {
      this.dialogRef.close('Close');
  }

    getval(value) {
        this.x = 0;
        this.listnumber = [];
        while ( this.x < value) {
          this.listnumber.push({number: this.x});
          this.x = this.x + 1;
        }
        console.log(this.listnumber.length);
    }
}
