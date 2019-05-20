import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ProfileComponent } from './profile/profile.component';
import { WomanComponent } from './woman/woman.component';
import { ManComponent } from './man/man.component';
import { ArticleComponent } from './article/article.component';
import { CarComponent } from './car/car.component';
import { SaleComponent } from './sale/sale.component';
import { AddressComponent } from './address/address.component';
import { AddComponent } from './address/add/add.component';
import { EditAddrComponent } from './address/edit-addr/edit-addr.component';
import { PayComponent } from './pay/pay.component';
import { storeGuard } from '../guard/store.guard';


const storeRoutes: Routes = [
    {path: '', component: StoreComponent},
    {path: "profile", component: ProfileComponent, canActivate: [storeGuard]},
    {path: "w", component: WomanComponent},
    {path: "m", component: ManComponent},
    {path: "article", component: ArticleComponent},
    {path: "shopcar", component: CarComponent},
    {path: "sale", component: SaleComponent, canActivate: [storeGuard]},
    {path: "pay", component: PayComponent, canActivate: [storeGuard]},
    {path: "address", component: AddressComponent, canActivate: [storeGuard]},
    {path: "address/add", component: AddComponent, canActivate: [storeGuard]},
    {path: "address/edit", component: EditAddrComponent, canActivate: [storeGuard]}
];

@NgModule({
    imports: [
        RouterModule.forChild(storeRoutes)
    ],
    exports: [RouterModule]
})

export class StoreRoutingModule {}