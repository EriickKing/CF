import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from './mainpage.component';
import { MainPageRoutingModule } from './mainpage-routing.module';
import { FirstlookComponent } from './firstlook/firstlook.component';
import { ServicesComponent } from './services/services.component';
import { PlansComponent } from './plans/plans.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { NewComponent } from './admin/new/new.component';

@NgModule({
    declarations: [
        MainpageComponent,
        FirstlookComponent,
        ServicesComponent,
        PlansComponent,
        FooterComponent,
        NavbarComponent,
        AdminComponent,
        NewComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainPageRoutingModule
    ],
})
export class MainPageModule {}