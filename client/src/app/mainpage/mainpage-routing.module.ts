import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage.component';
import { AdminComponent } from './admin/admin.component';
import { NewComponent } from './admin/new/new.component';
import { AddNewComponent } from './admin/new/add-new/add-new.component';
import { AllNewComponent } from './admin/new/all-new/all-new.component';
import { EditNewComponent } from './admin/new/edit-new/edit-new.component';

const mainpageRoutes: Routes = [
    {path: '', component: MainpageComponent},
    {path: "admin", component: AdminComponent, children: [
        {path: "news", component: NewComponent, children: [
            {path: "", component: AllNewComponent},
            {path: "add", component: AddNewComponent},
            {path: "edit", component: EditNewComponent}
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