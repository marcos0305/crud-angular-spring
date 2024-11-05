import { CoursesService } from './../services/courses.service';
import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: Course[] = [];
  displayedColumns = ['name', 'category'];

  //coursesService: CoursesService;

  constructor(private coursesService: CoursesService){

    //this.coursesService = new CoursesService();
    this.courses = this.coursesService.list();

  }
}
