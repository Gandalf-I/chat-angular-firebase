import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderBtnComponent} from './loader-btn/loader-btn.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [LoaderBtnComponent],
  exports: [
    LoaderBtnComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class ComponentsModule {
}
