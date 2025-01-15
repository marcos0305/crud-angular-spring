import { CoursesService } from './../services/courses.service';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../shared/pipes/category.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from "./courses/courses-list/courses-list.component";


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CategoryPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses$: Observable <Course[]>;


  //coursesService: CoursesService;

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ){

    //this.coursesService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError('Erro na pagina.');
        return of([])
      })
    );

  }
     onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
  onAdd(){
    //this.router.navigate(commands:['new'], extras:{relativeTo: this.route})
  }
}
