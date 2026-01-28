import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { ApiState } from './api-state.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Estado inicial de carga
  private readonly initialState: ApiState<any> = { data: null, loading: true, error: null };

  get<T>(url: string): Observable<ApiState<T>> {
    return this.http.get<T>(url).pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(this.initialState)
    );
  }

  post<T>(url: string, body: any): Observable<ApiState<T>> {
    return this.http.post<T>(url, body).pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(this.initialState)
    );
  }

  put<T>(url: string, body: any): Observable<ApiState<T>> {
    return this.http.put<T>(url, body).pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(this.initialState)
    );
  }

  patch<T>(url: string, body: any): Observable<ApiState<T>> {
    return this.http.patch<T>(url, body).pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(this.initialState)
    );
  }

  delete<T>(url: string): Observable<ApiState<T>> {
    return this.http.delete<T>(url).pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(this.initialState)
    );
  }
}
