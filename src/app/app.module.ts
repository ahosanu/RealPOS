import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { EmployeeComponent } from './employee/employee.component';
import {ChartModule} from 'angular2-chartjs';
import { ReportComponent } from './report/report.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatRadioModule, MatSelectModule, MatSnackBarModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import { AddEmployeeComponent } from './dialog/add-employee/add-employee.component';
import { AddCustomerComponent } from './dialog/add-customer/add-customer.component';
import { AddcategoryComponent } from './dialog/addcategory/addcategory.component';
import { AddProductComponent } from './dialog/add-product/add-product.component';
import {AuthguardGuard} from './guard/authguard.guard';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { ExpAlertComponent } from './dialog/exp-alert/exp-alert.component';
import { RePrintComponent } from './dialog/re-print/re-print.component';
import { BarcodePrintComponent } from './dialog/barcode-print/barcode-print.component';
import { SettingComponent } from './setting/setting.component';
const appRoutes: Routes =  [
    {
        path: 'main',
        canActivate: [AuthguardGuard],
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                canActivate: [AuthguardGuard],
                component: DashboardComponent
            },
            {
                path: 'employee',
                canActivate: [AuthguardGuard],
                component: EmployeeComponent
            },
            {
                path: 'setting',
                canActivate: [AuthguardGuard],
                component: SettingComponent
            },
            {
                path: 'products',
                canActivate: [AuthguardGuard],
                component: ProductsComponent
            },
            {
                path: 'report',
                canActivate: [AuthguardGuard],
                component: ReportComponent
            },
            {
                path: 'sale',
                canActivate: [AuthguardGuard],
                component: CreateInvoiceComponent
            },
            {
                path: 'invoice_list',
                canActivate: [AuthguardGuard],
                component: InvoicelistComponent
            },
            {
                path: 'category',
                canActivate: [AuthguardGuard],
                component: CategoryComponent
            },
            {
                path: 'customer',
                canActivate: [AuthguardGuard],
                component: CustomerComponent
            },
            {
                path: '**',
                canActivate: [AuthguardGuard],
                redirectTo: 'sale'
            }
            ]
    },
    {
        path: '**',
        component: LoginComponent
    }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    EmployeeComponent,
    ReportComponent,
    CustomerComponent,
    ProductsComponent,
    CategoryComponent,
    InvoicelistComponent,
    CreateInvoiceComponent,
    AddEmployeeComponent,
    AddCustomerComponent,
    AddcategoryComponent,
    AddProductComponent,
    ConfirmComponent,
    ExpAlertComponent,
    RePrintComponent,
    BarcodePrintComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
      ChartModule,
      HttpClientModule,
      HttpModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatAutocompleteModule,
      MatInputModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatCardModule,
      ReactiveFormsModule,
      FormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      BsDropdownModule.forRoot(),
      TooltipModule.forRoot(),
      ModalModule.forRoot(),
      MatRadioModule,
      MatSelectModule,
      MatCheckboxModule,
      MatSnackBarModule
       ],
  providers: [],
  bootstrap: [AppComponent],
    entryComponents: [
        AddEmployeeComponent,
        AddCustomerComponent,
        AddcategoryComponent,
        AddProductComponent,
        ConfirmComponent,
        ExpAlertComponent,
        RePrintComponent,
        BarcodePrintComponent
    ]
})
export class AppModule { }
