import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { ApiState } from './api-state.interface';

export function startWithState<T>(initialState: ApiState<T>) {
  return (source: Observable<T>): Observable<ApiState<T>> => {
    return source.pipe(
      map(data => ({ data, loading: false, error: null })),
      catchError(error => of({ data: null, loading: false, error })),
      startWith(initialState)
    );
  };
}
