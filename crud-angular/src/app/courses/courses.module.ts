import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { CoursesRoutingModule } from './courses-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule
  ]
})
export class CoursesModule { }
