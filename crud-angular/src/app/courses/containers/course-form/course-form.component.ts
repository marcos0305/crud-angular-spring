import { Component } from '@angular/core';
import { ReactiveFormsModule, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
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


@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatCardModule, MatOption ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {

  form!: FormGroup;
name: any;

  constructor(public formBuilder: NonNullableFormBuilder,
    public service: CoursesService,
    public snackBar: MatSnackBar,
    public location: Location,
    public route: ActivatedRoute){

      this.form = this.formBuilder.group({
        _id: [''],
        name: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
        category: ['', [Validators.required]]
      });
  }

  ngOnInit(): void{
    const course:Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe({
      next:() => console.log('Resultado', this.onSucess),
      error: () =>this.onError()
    });
  }
  onCancel(){
    this.location.back
  }

  private onSucess(){
    this.snackBar.open('Curso salvo com sucesso ','',{duration:1000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso','',{duration:1000});
  }

  getErrorMessage(fieldName:string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlenght')){
      const requiredLength = field.errors ? field.errors['minlength']['requiredLenght']: 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }

    if(field?.hasError('maxlenght')){
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLenght']: 50;
      return `Tamanho máximo excedido de ${requiredLength} caracteres`;
    }

      return 'Erro';
  }
}
