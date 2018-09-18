import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {AddEmployeeComponent} from '../add-employee/add-employee.component';
import {WebServiceService} from '../../guard/web-service.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
    showImageUpload = true;
    showImage = false;
    sex = 'male';
    TSelect;
    userTypes;
    email = new FormControl('', [Validators.email]);
    fullName = new FormControl('', [Validators.required, Validators.minLength(4)]);
    mobile = new FormControl('', [Validators.required, Validators.minLength(11)]);
    address = new FormControl('', [Validators.required]);
    title: any;
    photo: any;
    id: any;
    url: any;
    constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
                private req: WebServiceService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data['title'];
        this.url = this.req.MAIN_URL;
        this.email.setValue(data['email']);
        this.fullName.setValue(data['name']);
        this.mobile.setValue(data['mobile']);
        this.address.setValue(data['address']);
        this.photo = data['photo'];
        this.id = data['id'];
    }

    ngOnInit() {
    }

    onSubmit(img: any) {
        if (this.fullName.valid && this.mobile.valid && this.address.valid && this.email.valid) {
            const _FileData: FormData = new FormData();
            if (img.files[0] != null) {
                const _image: File = img.files[0];
                _FileData.append('fileToUpload', _image);
                _FileData.append('img', 'yes');
                console.log('yes');
            }
            _FileData.append('fullname', this.fullName.value.trim());
            _FileData.append('email', this.email.value.trim());
            _FileData.append('mobile', this.mobile.value.trim());
            _FileData.append('address', this.address.value.trim());
            if (this.id === -1) {
                this.req.AddUser(_FileData).subscribe(
                    res => {
                        console.log(res);
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        }
                    });
            } else {
                _FileData.append('id', this.id.toString());
                _FileData.append('photo', this.photo);
                this.req.UpdateUser(_FileData).subscribe(
                    res => {
                        console.log(res);
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        }
                    });
            }
        }

    }

    onClose() {
        this.dialogRef.close('Close');
    }

    getErrorMessage() {
        return this.email.hasError('email') ? 'Not a valid email' :
            '';
    }
    getAddressMessage() {
        return this.address.hasError('required') ? 'You must enter a value' : '';
    }

    getFullNameMessage() {
        return this.fullName.hasError('required') ? 'You must enter a value' :
            this.fullName.hasError('minlength') ? 'Name must be at least 4 characters long.' : '';
    }

    getMobileMessage() {
        return this.mobile.hasError('required') ? 'You must enter a value' :
            this.mobile.hasError('minlength') ? 'Name must be at least 11 characters long.' : '';
    }

    userImage(userImageView: any, fileInput: any) {
        fileInput.addEventListener('change', function () {
            const reader = new FileReader();
            reader.onloadend = function () {
                userImageView.src = reader.result;
            };
            if (fileInput.files[0]) {
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                userImageView.src = '';
            }
        });
        fileInput.click();
        this.showImageUpload = false;
        this.showImage = true;
    }

}
