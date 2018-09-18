import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {WebServiceService} from '../../guard/web-service.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {

    name = new FormControl('', [Validators.required, Validators.minLength(4)]);
    discount = new FormControl();
    title: string;
    id: number;
    constructor(public dialogRef: MatDialogRef<AddcategoryComponent>,
                private req: WebServiceService,
                @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.name.setValue(data['name']);
        this.discount.setValue(data['discount']);
        this.title = data['title'];
        this.id = data['id'];
    }

    ngOnInit() {
    }

    onSubmit() {
        if (this.name.valid) {
            const _FileData: FormData = new FormData();
            _FileData.append('name', this.name.value.trim());
            _FileData.append('discount', this.discount.value.toString());
            if (this.id === null) {
                this.req.AddCategory(_FileData).subscribe(
                    res => {
                        console.log(res);
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        }
                    });
            } else {
                _FileData.append('id', this.id.toString());
                this.req.UpdateCategory(_FileData).subscribe(
                    res => {
                        console.log(res);
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
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
        return this.name.hasError('required') ? 'You must enter a value' :
            this.name.hasError('minlength') ? 'Enter 4 character Name' :
                '';
    }
}
