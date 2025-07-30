import { Lesson } from './../../model/lesson';
import { Component } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, FormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatCardModule, MatOption, MatIconModule ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
getErrorMessage(arg0: string) {
throw new Error('Method not implemented.');
}

  form!: FormGroup;
  name: any;

  constructor(public formBuilder: NonNullableFormBuilder,
    public service: CoursesService,
    public snackBar: MatSnackBar,
    public location: Location,
    public route: ActivatedRoute){


  }

  ngOnInit(): void{
    const course:Course = this.route.snapshot.data['course'];
    this.form = this.formBuilder.group({
          _id: [course._id],
          name: [course.name,[Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)]],
          category: [course.category, [Validators.required]],
          lessons:this.formBuilder.array(this.retrieveLessons(course), Validators.required)
      });

  }

  private retrieveLessons(course:Course){
    const lessons: any[] = [];
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    }else{
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {id: '', name:'',youtubeUrl: ''}){
    this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required,
      Validators.minLength(10),
      Validators.maxLength(11)]]
    });
  }

  getLessonsFormArray(){
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addNewLessons(): void{
    const lessons = this.form.get('lesson') as UntypedFormArray;
    lessons.push(this.createLesson);
  }

  removeLesson(index: number){
    const lessons = this.form.get('lesson') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit(){
    if (this.form.valid){
      this.service.save(this.form.value)
      .subscribe(result =>this.onSuccess(), error => this.onError())
    }else{
      alert('form invalido');
    }
  }

  onError(): void {
    throw new Error('Method not implemented.');
  }
  onSuccess(): void {
    throw new Error('Method not implemented.');
  }
  onCancel(){
    this.location.back
  }

isFormArratRequired(){
  const lessons = this.form.get('lessons') as UntypedFormArray;
  return !lessons.valid && lessons.hasError('required') && lessons.touched;
}
}
