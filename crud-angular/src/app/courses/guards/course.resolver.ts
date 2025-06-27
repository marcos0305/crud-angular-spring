import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Course> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> => {
  const service = inject(CoursesService);

  if (route.params && route.params['id']) {
    return service.loadById(route.params['id']);
  }

  return of({ _id: '', name: '', category: '', lessons: [] });
};
