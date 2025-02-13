import { Course } from './../../model/course';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  imports:[
    MatTableModule,
    MatIconModule
  ]
})
export class CoursesListComponent {
  @Input() courses!: Course[];
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Course>();
  @Output() remove = new EventEmitter<Course>();
displayedColumns: any;

  onAdd() {
    this.add.emit();
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }
  onDelete(Course: Course | undefined){
    this.remove.emit(Course);
  }
}
