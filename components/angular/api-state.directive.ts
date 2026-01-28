import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiState } from './api-state.interface';


@Component({ selector: 'app-default-loading', template: '<p>Cargando...</p>', standalone: true })
export class DefaultLoadingComponent {}

@Component({ selector: 'app-default-error', template: '<p>Ocurrió un error inesperado.</p>', standalone: true })
export class DefaultErrorComponent {}



@Directive({
  selector: '[appApiState]',
  standalone: true
})
export class ApiStateDirective<T> implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  @Input('appApiStateLoading') loadingTemplate?: TemplateRef<any>;
  @Input('appApiStateError') errorTemplate?: TemplateRef<any>;

  // Ahora recibimos directamente el Observable en lugar del valor ya resuelto
  @Input('appApiState') set state$(source: Observable<ApiState<T>> | null) {
    if (!source) return;

    // Limpiamos cualquier suscripción previa (por si el observable cambia)
    this.destroy$.next();

    source.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state) => this.render(state),
      error: (err) => this.render({ data: null, loading: false, error: err })
    });
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) {}

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

  ngOnDestroy(): void {
    // Cerramos el Subject para desuscribirnos automáticamente
    this.destroy$.next();
    this.destroy$.complete();
  }
}
