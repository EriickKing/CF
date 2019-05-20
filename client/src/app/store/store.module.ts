import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { NavbarSComponent } from '../navbar-s/navbar-s.component';
import { ProfileComponent } from './profile/profile.component';
import { MainPageModule } from '../mainpage/mainpage.module';
import { WomanComponent } from './woman/woman.component';
import { ManComponent } from './man/man.component';
import { ArticleComponent } from './article/article.component';
import { CarComponent } from './car/car.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleComponent } from './sale/sale.component';
import { AddressComponent } from './address/address.component';
import { AddComponent } from './address/add/add.component';
import { SharedModule } from '../Services/directives/shared.module';
import { EditAddrComponent } from './address/edit-addr/edit-addr.component';
import { PayComponent } from './pay/pay.component';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
    declarations: [
        StoreComponent,
        NavbarSComponent,
        ProfileComponent,
        WomanComponent,
        ManComponent,
        ArticleComponent,
        CarComponent,
        SaleComponent,
        AddressComponent,
        AddComponent,
        EditAddrComponent,
        PayComponent
    ],
    imports: [
        NgxPayPalModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        StoreRoutingModule,
        SharedModule,
        MainPageModule
    ],
    exports: [NavbarSComponent]
})
export class StoreModule {}