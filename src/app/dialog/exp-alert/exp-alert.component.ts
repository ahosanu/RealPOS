import {Component, Inject, OnInit} from '@angular/core';
import {ConfirmComponent} from '../confirm/confirm.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-exp-alert',
  templateUrl: './exp-alert.component.html',
  styleUrls: ['./exp-alert.component.scss']
})
export class ExpAlertComponent implements OnInit {
    message: string;
    name: string;
    constructor(public dialogRef: MatDialogRef<ExpAlertComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private router: Router) {
        this.name = data['name'];
        this.message = data['msg'];
    }

    ngOnInit() {
    }
    onSubmit() {
        this.router.navigateByUrl('/main/products');
        this.dialogRef.close('yes');
    }
    onClose() {
        this.dialogRef.close('Close');
    }
}
