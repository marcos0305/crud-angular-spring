import { Course } from './../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Component} from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../../shared/pipes/category.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importe o módulo aqui



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CategoryPipe,
    MatToolbarModule,
    CoursesListComponent,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {

  courses$: Observable <Course[]>;

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ){

    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro na pagina.');
        return of([]);
      })
    );

  }
     onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course:Course){
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

}
