import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarDirective } from './navbar.directive';
import { OnlyNumber } from './numbers.directive';

@NgModule({
  declarations: [
    NavBarDirective,
    OnlyNumber
  ],
  exports: [
    NavBarDirective,
    OnlyNumber
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}