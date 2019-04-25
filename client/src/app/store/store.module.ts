import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { NavbarSComponent } from '../navbar-s/navbar-s.component';

@NgModule({
    declarations: [
        StoreComponent,
        NavbarSComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule
    ],
    exports: [NavbarSComponent]
})
export class StoreModule {}