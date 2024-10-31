import { CoursesModule } from './courses/courses.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes= [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'courses', loadChildren: () => import ('./courses/courses.module'). then(m => m.CoursesModule) }
];

@NgModule({
  declarations: [],
  imports: [CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
