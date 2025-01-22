import { Component, Output, input } from '@angular/core';
import { Course } from './course.model'; // Importe o modelo
import { EventEmitter } from 'stream';

@Component({
  standalone: true,
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
readonly courses = input<Course[]>([]);
@Output() add = new EventEmitter();

readonly displayedColumns = ['name', 'category', 'actions'];

constructor(){}

  ngOnInit(): void{}

  onAdd(){
    this.add.emit('');
  }
}
