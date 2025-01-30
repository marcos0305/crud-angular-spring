import { Component, Output} from '@angular/core';
import { Course } from './course.model';
import { EventEmitter } from 'stream';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ]
})
export class CoursesListComponent {
readonly courses: Course[]= [];
@Output() add = new EventEmitter();

readonly displayedColumns = ['name', 'category', 'actions'];

constructor(){}

  onAdd(){
    this.add.emit('addEvent');
  }
  onEdit(course:Course){
    console.log('Editando curso:', course);
  }
}
