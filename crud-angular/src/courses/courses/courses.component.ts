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

  courses: Course[] = [
    {_id:'1', name:'Java', category:'front-end'}
  ];
  displayedColumns = ['name', 'category'];

  constructor(){
  }
}
