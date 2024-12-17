import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  save(value: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private readonly API = 'api/courses';

  constructor(private readonly httpClient: HttpClient) { }



  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(7500),
      tap(courses => console.log(courses))
    );
  }
}
