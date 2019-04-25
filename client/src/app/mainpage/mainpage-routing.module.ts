import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './mainpage.component';
import { AdminComponent } from './admin/admin.component';
import { NewComponent } from './admin/new/new.component';

const mainpageRoutes: Routes = [
    {path: '', component: MainpageComponent},
    {path: "admin", component: AdminComponent, children: [
        {path: "news", component: NewComponent}
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(mainpageRoutes)
    ],
    exports: [RouterModule]
})

export class MainPageRoutingModule {}