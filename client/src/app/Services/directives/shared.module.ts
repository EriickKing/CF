import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarDirective } from './navbar.directive';

@NgModule({
  declarations: [
    NavBarDirective
  ],
  exports: [
    NavBarDirective
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}