import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  Component,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiState } from './api-state.interface';


@Component({ selector: 'app-default-loading', template: '<p>Cargando...</p>', encapsulation: ViewEncapsulation.None, standalone: true })
export class DefaultLoadingComponent {}

@Component({ selector: 'app-default-error', template: '<p>Ocurrió un error inesperado.</p>', styles: ['.error {color: var(--error-color, #dd1313)}'], encapsulation: ViewEncapsulation.None, standalone: true })
export class DefaultErrorComponent {}



/**
 * @example
 *
 * ```typescript
 * // ...
 * readonly todos$ = this.http
 *   .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
 *   .pipe(startWithState(INITIAL_STATE));
 *
 * constructor(readonly http: HttpClient) {}
 * // ...
 * ```
 *
 * ```html
 *  <h3 *asyncState="null; placeholder: miPlaceholder">Contenido</h3>
 *
 *  <ul *asyncState="todos$; loading: miLoading; error: miError; let todos">
 *    <li *ngFor="let todo of todos"> {{ todo.title }} </li>
 *  </ul>
 *
 *  <ng-template #miLoading>Cargando...</ng-template>
 *  <ng-template #miError let-err>Error: {{ err.message }}</ng-template>
 *  <ng-template #miPlaceholder><h3>Un placeholder</h3></ng-template>
 * ```
 */
@Directive({
  selector: '[appApiState]',
  standalone: true
})
export class ApiStateDirective<T> implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  @Input('appApiStateLoading') loadingTemplate?: TemplateRef<any> | null;
  @Input('appApiStateError') errorTemplate?: TemplateRef<any> | null;
  @Input('appApiStatePlaceholder') placeholderTemplate?: TemplateRef<any> | null;

  // Ahora recibimos directamente el Observable en lugar del valor ya resuelto
  @Input('appApiState') set state$(source: Observable<ApiState<T>> | null) {
    this._source = source;
  }

  private _source: Observable<ApiState<T>> | null = null;

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    if (!this._source) {
      this.renderPlaceholder();
      return;
    }

    // Limpiamos cualquier suscripción previa (por si el observable cambia)
    this.destroy$.next();

    this._source.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state) => this.render(state),
      error: (err) => this.render({ data: null, loading: false, error: err }),
    });
  }

  ngOnDestroy(): void {
    // Cerramos el Subject para desuscribirnos automáticamente
    this.destroy$.next();
    this.destroy$.complete();
  }

  private render(state: ApiState<T>) {
    this.vcr.clear();

    if (state.loading) {
      this.renderLoading();
    } else if (state.error) {
      this.renderError(state.error);
    } else if (state.data !== null) {
      this.vcr.createEmbeddedView(this.templateRef, { $implicit: state.data });
    }
  }

  private renderLoading() {
    this.loadingTemplate 
      ? this.vcr.createEmbeddedView(this.loadingTemplate) 
      : this.vcr.createComponent(DefaultLoadingComponent);
  }

  private renderError(error: any) {
    if (this.errorTemplate) {
      this.vcr.createEmbeddedView(this.errorTemplate, { $implicit: error });
    } else {
      const ref = this.vcr.createComponent(DefaultErrorComponent);
      (ref.instance as any).error = error;
    }
  }

  private renderPlaceholder() {
    if (!this.placeholderTemplate) return;

    this.vcr.clear();
    this.vcr.createEmbeddedView(this.placeholderTemplate);
  }
}
