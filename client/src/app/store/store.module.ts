import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { NavbarSComponent } from '../navbar-s/navbar-s.component';
import { ProfileComponent } from './profile/profile.component';
import { MainPageModule } from '../mainpage/mainpage.module';
import { WomanComponent } from './woman/woman.component';
import { ManComponent } from './man/man.component';
import { ArticleComponent } from './article/article.component';
import { CarComponent } from './car/car.component';

@NgModule({
    declarations: [
        StoreComponent,
        NavbarSComponent,
        ProfileComponent,
        WomanComponent,
        ManComponent,
        ArticleComponent,
        CarComponent
    ],
    imports: [
        CommonModule,
        StoreRoutingModule,
        MainPageModule
    ],
    exports: [NavbarSComponent]
})
export class StoreModule {}