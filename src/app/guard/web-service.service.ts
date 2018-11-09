import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  MAIN_URL = 'http://localhost';
  MAIN_Access: any;
  constructor(private http: HttpClient) { }
  getLoginAccess(user: String, Pass: String): Observable<any> {
      return this.http.get(this.MAIN_URL + '/php/permission.php?user=' + user + '&password=' + Pass).pipe(map(data => {
          return data;
      }, err => {
          return null;
      }));
  }
  getMainInfo(): Observable<any> {
      return this.http.get(this.MAIN_URL + '/php/Get_Main.php').pipe(map(data => {
        return data;
      }, err => {
          return null;
      }));
  }
  getEmployeeList(): Observable<any> {
      return this.http.get(this.MAIN_URL + '/php/Employee.php').pipe(map(data => {
        return data;
      }, err => {
          return null;
      }));
  }

    getUserTypeList(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/UserType.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    checkUsername(value: string): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/validUser.php?user=' + value).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    AddUser(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/AddUser.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getUserList(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/Customer.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getCategory(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/Category.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    AddCategory(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/AddCategory.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    UpdateCategory(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/UpdateCategory.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getProductList(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/ProductList.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    AddProduct(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/AddProduct.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    UpdateProduct(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/UpdateProduct.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    RemovePro(pro_id: number | string) {
        return this.http.get(this.MAIN_URL + '/php/DeleteProduct.php?pro_id=' + pro_id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    RemoveCat(ca_id: number | string) {
        return this.http.get(this.MAIN_URL + '/php/DeleteCategory.php?ca_id=' + ca_id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }
    GetInvoicePro(id: number | string) {
        return this.http.get(this.MAIN_URL + '/php/InvoiceProduct.php?id=' + id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    GetInvoiceMember(id: any): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/GetCustomer.php?id=' + id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    CreateInvoice(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/CreateInvoice.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getInvoiceList(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/InvoiceList.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    AddProductList(pro_id: string | number, last_id: any, dicount: any, unit: any) {
        return this.http.get(this.MAIN_URL + '/php/AddProductList.php?pro_id=' + pro_id + '&in_id=' +
            last_id + '&discount=' + dicount + '&unit=' + unit).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getProductListDate(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/ProductListDate.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    Dashboard(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/Dashboard_info.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    UpdateUser(_FileData: FormData): Observable<any> {
        return this.http.post(this.MAIN_URL + '/php/UpdateUser.php', _FileData).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    DeleteUser(id: any) {
        return this.http.get(this.MAIN_URL + '/php/DeleteUser.php?us_id=' + id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getReportProductList(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/ProductReportList.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getPrintList(id: null | number): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/ReprintList.php?id=' + id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    CreateBarcode(id: number | null | string, pro_name: string | string,
                  sale_price: string | string | number): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/barcode.php?text=' + id
            + '&print=true&pro_name=' + pro_name + '&price=' + sale_price).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }
    DeleteBarcode(code: string): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/deleteImg.php?code=' + code).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    getReportProductList_date(start_date: string, End_date: string): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/ProductReportList.php?start=' + start_date + '&end=' + End_date).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    Dashboard_date(s: string, s2: string): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/Dashboard_info.php?start=' + s + '&end=' + s2).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    RemoveUserTypeList(id: String): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/DeleteUserType.php?id=' + id).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    AddUserTypeList(name: string, type: string): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/AddUserType.php?name=' + name + '&access=' + type).pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }

    setting(): Observable<any> {
        return this.http.get(this.MAIN_URL + '/php/setting.php').pipe(map(data => {
            return data;
        }, err => {
            return null;
        }));
    }
}
