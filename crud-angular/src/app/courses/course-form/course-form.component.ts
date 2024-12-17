import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatCardModule, MatOption ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public service: CoursesService,
    private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      name:[''],
      category:['']
    });
  }
  onSubmit(){
    this.service.save(this.form.value)
    .subscribe({
      next:(result) => console.log('Resultado', result),
      error: () =>this.onError()

    });
  }
  onCancel(){

  }
  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{duration:1000});
  }
}
