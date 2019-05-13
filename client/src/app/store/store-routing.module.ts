import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store.component';
import { ProfileComponent } from './profile/profile.component';
import { WomanComponent } from './woman/woman.component';
import { ManComponent } from './man/man.component';
import { ArticleComponent } from './article/article.component';
import { CarComponent } from './car/car.component';


const storeRoutes: Routes = [
    {path: '', component: StoreComponent},
    {path: "profile", component: ProfileComponent},
    {path: "w", component: WomanComponent},
    {path: "m", component: ManComponent},
    {path: "article", component: ArticleComponent},
    {path: "shopcar", component: CarComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(storeRoutes)
    ],
    exports: [RouterModule]
})

export class StoreRoutingModule {}