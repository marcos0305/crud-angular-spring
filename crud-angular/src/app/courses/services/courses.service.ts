import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';
import { CoursePage } from '../model/course-page';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  save(value: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  private readonly API = 'api/courses';

  constructor(private readonly httpClient: HttpClient) { }

  loadById(id: string){
   return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  list(page = 0, size = 10): Observable<CoursePage>{
    return this.httpClient.get<CoursePage>(this.API, {params: {page, size}})
    .pipe(
      first(),
      delay(7500),
      tap(courses => console.log(courses))
    );
  }
  save1(record: Partial<Course>){
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Course>){
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
