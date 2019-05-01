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
import { AddNewComponent } from './admin/new/add-new/add-new.component';
import { AllNewComponent } from './admin/new/all-new/all-new.component';
import { EditNewComponent } from './admin/new/edit-new/edit-new.component';
import { ServiceComponent } from './admin/service/service.component';
import { AllServiceComponent } from './admin/service/all-service/all-service.component';
import { AddServiceComponent } from './admin/service/add-service/add-service.component';
import { EditServiceComponent } from './admin/service/edit-service/edit-service.component';
import { PlanComponent } from './admin/plan/plan.component';
import { AllPlanComponent } from './admin/plan/all-plan/all-plan.component';
import { AddPlanComponent } from './admin/plan/add-plan/add-plan.component';
import { EditPlanComponent } from './admin/plan/edit-plan/edit-plan.component';
import { InstallationComponent } from './admin/installation/installation.component';
import { AllInstComponent } from './admin/installation/all-inst/all-inst.component';
import { AddInstComponent } from './admin/installation/add-inst/add-inst.component';
import { EditInstComponent } from './admin/installation/edit-inst/edit-inst.component';
import { InstComponent } from './inst/inst.component';
import { SharedModule } from '../Services/directives/shared.module';

@NgModule({
    declarations: [
        MainpageComponent,
        FirstlookComponent,
        ServicesComponent,
        PlansComponent,
        FooterComponent,
        NavbarComponent,
        AdminComponent,
        NewComponent,
        AddNewComponent,
        AllNewComponent,
        EditNewComponent,
        ServiceComponent,
        AllServiceComponent,
        AddServiceComponent,
        EditServiceComponent,
        PlanComponent,
        AllPlanComponent,
        AddPlanComponent,
        EditPlanComponent,
        InstallationComponent,
        AllInstComponent,
        AddInstComponent,
        EditInstComponent,
        InstComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainPageRoutingModule,
        SharedModule
    ],
})
export class MainPageModule {}