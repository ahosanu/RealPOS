import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {WebServiceService} from '../guard/web-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  user = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
    getErrorMessage() {
        return this.user.hasError('required') ? 'You must enter a value' : '';
    }
    getErrorMessagePass() {
        return this.password.hasError('required') ? 'You must enter a value' : '';
    }
  constructor(private router: Router, public snackBar: MatSnackBar,
              private req: WebServiceService
  ) {
      sessionStorage.clear();
  }

  ngOnInit() {
  }

    OnSubmit(name: string, password: string) {

        this.req.getLoginAccess(name, password).subscribe(
            res => {
                if (res['permission'] === 'yes') {
                    sessionStorage.setItem('access', res['access']);
                    sessionStorage.setItem('login', 'true');
                    this.router.navigateByUrl('main');
                } else {
                    this.snackBar.open(res['permission'], 'Close', {
                        duration: 2000,
                    });
                }
            }
        );
    }
}
