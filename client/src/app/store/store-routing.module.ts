import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';


const storeRoutes: Routes = [
    {path: '', component: StoreComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(storeRoutes)
    ],
    exports: [RouterModule]
})

export class StoreRoutingModule {}