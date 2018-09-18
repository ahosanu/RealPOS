import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
    message: string;
    name: string;
    constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.name = data['name'];
        this.message = data['msg'];
    }

    ngOnInit() {
    }
    onSubmit() {
        this.dialogRef.close('yes');
    }
    onClose() {
        this.dialogRef.close('Close');
    }
}
