import { Component, OnInit } from '@angular/core';
import {WebServiceService} from '../guard/web-service.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ConfirmComponent} from '../dialog/confirm/confirm.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
    showImageUpload = true;
    showImage = false;
    photo: any;
    asccess_type = '0';
    url: string;
    displayedColumns = ['type_name', 'type_id'];
    dataSource;
    name = new FormControl('', [Validators.required]);
  constructor(public req: WebServiceService, public dialog: MatDialog) {
      this.url = this.req.MAIN_URL;
     this.loadTable();
  }

  ngOnInit() {
  }
  loadTable() {
      this.req.getUserTypeList().subscribe(
          res => {
              this.dataSource = new MatTableDataSource(res);
          });
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
    addType() {
       this.req.AddUserTypeList(this.name.value, this.asccess_type.toString()).subscribe(
            res => {
                if (res['msg'] === 'yes') {
                    this.loadTable();
                    this.name.setValue(null);
                }
            });
    }
    RemoveUser(id: String, name: string) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '400px',
            data: {name: name, msg: 'Are You sure Delete This User Type?'}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                this.req.RemoveUserTypeList(id).subscribe(
                    res => {
                        if (res['msg'] === 'yes') {
                           this.loadTable();
                        }
                    });
            }
            console.log(`Dialog result: ${result}`);
        });
    }
}
