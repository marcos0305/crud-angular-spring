import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  standalone: true,
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] | null = [];
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Course>();

  onAdd() {
    this.add.emit();
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }
}
