import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CfAdminComponent } from './auth/cf-admin/cf-admin.component';
import { NotCfGuard } from './guard/not-cf.guard';
import { NofoundComponent } from './nofound/nofound.component';
import { NotStoreGuard } from './guard/notStore.guard';

const routes: Routes = [
  { path: '', loadChildren: "./mainpage/mainpage.module#MainPageModule"},
  { path: "store", loadChildren: "./store/store.module#StoreModule"},
  { path: "auth", component: AuthComponent, canActivate: [NotStoreGuard] },
  { path: "cfadmin", component: CfAdminComponent, canActivate: [NotCfGuard]},
  { path: "**", component: NofoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
