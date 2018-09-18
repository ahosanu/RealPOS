import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {WebServiceService} from '../../guard/web-service.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
    showImageUpload = true;
    showImage = false;
    sex = 'male';
    TSelect: any;
    userTypes;
    email = new FormControl('', [Validators.email]);
    user_name = new FormControl('', [Validators.required]);
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
        this.user_name.setValue(data['user']);
        this.email.setValue(data['email']);
        this.fullName.setValue(data['name']);
        this.mobile.setValue(data['mobile']);
        this.address.setValue(data['address']);
        this.photo = data['photo'];
        this.id = data['id'];
        this.TSelect = data['ut_id'];
        this.req.getUserTypeList().subscribe(
            res => {
                this.userTypes = res;
                if (this.TSelect === '-1') {
                    this.TSelect = this.userTypes[0].ut_id;
                }
            });
    }

    ngOnInit() {
    }

    onSubmit(utype: string, img: any) {
        if (this.user_name.valid && this.fullName.valid && this.mobile.valid && this.address.valid && this.email.valid) {
            const _FileData: FormData = new FormData();
            if (img.files[0] != null) {
                const _image: File = img.files[0];
                _FileData.append('fileToUpload', _image);
                _FileData.append('img', 'yes');
                console.log('yes');
            }
            _FileData.append('fullname', this.fullName.value.trim());
            _FileData.append('user_name', this.user_name.value.trim());
            _FileData.append('email', this.email.value.trim());
            _FileData.append('mobile', this.mobile.value.trim());
            _FileData.append('address', this.address.value.trim());
            _FileData.append('sex', this.sex.trim());
            _FileData.append('type', utype.toString());
            if (this.id === -1) {
                this.req.AddUser(_FileData).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                            this.dialogRef.close(res);
                        }
                    });
            } else {
                _FileData.append('id', this.id.toString());
                _FileData.append('photo', this.photo.trim());
                this.req.UpdateUser(_FileData).subscribe(
                    res => {
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
    getUserNameMessage() {
        return this.user_name.hasError('required') ? 'You must enter a value' :
            this.user_name.hasError('alreadyExist') ? 'User Name Already Exist' : '';
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
    validateUsername() {
        this.req.checkUsername(this.user_name.value)
            .subscribe(
                res => {
                    this.user_name.setErrors(res);
                }
            );
    }
}
