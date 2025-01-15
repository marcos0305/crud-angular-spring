import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Course } from './course.model'; // Importe o modelo

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
onAdd() {
throw new Error('Method not implemented.');
}
  // Define a lista de cursos como um observable
  courses$ = of<Course[]>([
    { id: 1, name: 'Curso Angular', description: 'Aprenda Angular' },
    { id: 2, name: 'Curso React', description: 'Aprenda React' },
    { id: 3, name: 'Curso Vue', description: 'Aprenda Vue' }
  ]);
displayedColumns: any;
}
