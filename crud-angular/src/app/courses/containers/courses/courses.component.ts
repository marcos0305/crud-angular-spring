import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from './../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Component, ViewChild, viewChild} from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importe o módulo aqui
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from "@angular/material/paginator";



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatToolbarModule,
    CoursesListComponent,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginator
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {

  courses$: Observable <CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;
  courses: Observable<CoursePage | { courses: never[]; totalElments: number; totalPages: number; }> | undefined;

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ){
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 } ){
    this.courses = this.coursesService.list(pageEvent.pageIndex, pageEvent.pageSize)
    .pipe(
      tap(() => {
        this.pageIndex = pageEvent.pageIndex;
        this.pageSize = pageEvent.pageSize;
      }),
      catchError(error => {
        this.onError('Erro na pagina.');
        return of({courses: [], totalElments: 0, totalPages: 0});
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

  onRemove(course:Course){
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: 'Tem certeza que deseja remover esse curso?',
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
       if(result){
        this.coursesService.remove(course._id).subscribe(
          () =>{
            this.refresh();
            this.snackBar.open('Erro ao removido curso','',{duration:5000,
              verticalPosition:'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError('Erro ao tentar remover curso.')
        );
       }
      });
 }
}
