import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage.component';
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

const mainpageRoutes: Routes = [
    {path: '', component: MainpageComponent},
    {path: "admin", component: AdminComponent, children: [
        {path: "new", component: NewComponent, children: [
            {path: "", component: AllNewComponent},
            {path: "add", component: AddNewComponent},
            {path: "edit", component: EditNewComponent}
        ]},
        {path: "service", component: ServiceComponent, children: [
            {path: "", component: AllServiceComponent},
            {path: "add", component: AddServiceComponent},
            {path: "edit", component: EditServiceComponent}
        ]},
        {path: "plan", component: PlanComponent, children: [
            {path: "", component: AllPlanComponent},
            {path: "add", component: AddPlanComponent},
            {path: "edit", component: EditPlanComponent}
        ]},
        {path: "installation", component: InstallationComponent, children: [
            {path: "", component: AllInstComponent},
            {path: "add", component: AddInstComponent},
            {path: "edit", component: EditInstComponent}
        ]}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(mainpageRoutes)
    ],
    exports: [RouterModule]
})

export class MainPageRoutingModule {}