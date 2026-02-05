import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  ErrorHandler,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  Observable,
  Subscribable,
  Subscription,
  Unsubscribable,
  isObservable,
} from 'rxjs';

// Contexto para el tipado estricto en el template
export interface RxLetContext<T> {
  $implicit: T | null;
  rxLet: T | null;
  error: unknown;
  complete: boolean;
}

/**
 * @Directive RxLetDirective
 *
 * @ngModule SharedModule
 *
 * @usageNotes
 * ```typescript
 * // ... existing code ...
 * readonly resize$ = resize$.pipe(
 *   map(() => ({ w: window.innerWidth, h: window.innerHeight })),
 * );
 * // ... existing code ...
 * ```
 *
 * ```html
 *  <div *rxLet="resize$ as resize">
 *    <p>{{resize | json}}</p>
 *  </div>
 * ```
 *
 * @description
 *  Simplificar la suscripción a observables en templates de Angular, resolviendo sus valores automáticamente.
 *
 */
@Directive({ selector: '[rxLet]' })
export class RxLetDirective<T> implements OnInit, OnDestroy {
  // Estado interno
  private _ref: EmbeddedViewRef<RxLetContext<T>> | null = null;
  private _subscription: Unsubscribable | null = null;
  private _source: Observable<T> | Subscribable<T> | PromiseLike<T> | null =
    null;

  // Flag para optimización (copiado de AsyncPipe):
  // Si el valor llega síncronamente durante la suscripción, no marcamos para chequeo aún.
  private _markForCheckOnValueUpdate = true;

  // Contexto inicial
  private _context: RxLetContext<T> = {
    $implicit: null,
    rxLet: null,
    error: null,
    complete: false,
  };

  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<RxLetContext<T>>,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandler,
  ) {}

  @Input()
  set rxLet(
    source: Observable<T> | Subscribable<T> | PromiseLike<T> | null | undefined,
  ) {
    if (source && source === this._source) {
      return;
    }

    // Si cambia la fuente, limpiamos la suscripción anterior
    if (this._subscription) {
      this._dispose();
    }

    this._source = source || null;

    if (this._source) {
      // Intentamos suscribirnos con la bandera de sincronía desactivada temporalmente
      try {
        this._markForCheckOnValueUpdate = false;
        this._subscribe(this._source);
      } finally {
        this._markForCheckOnValueUpdate = true;
      }
    } else {
      // Si nos pasan null/undefined, reseteamos la vista
      this._updateView(null);
    }
  }

  ngOnInit(): void {
    // Creamos la vista una sola vez
    this.createView();
  }

  ngOnDestroy(): void {
    this._dispose();
    this._ref = null;
  }

  private createView(): void {
    if (!this._ref) {
      this._ref = this.viewContainer.createEmbeddedView(
        this.template,
        this._context,
      );
    }
  }

  private _subscribe(
    obj: Observable<T> | Subscribable<T> | PromiseLike<T>,
  ): void {
    // Estrategia para Observables
    if (isObservable(obj) || (obj && 'subscribe' in obj)) {
      const obs = obj as Subscribable<T>;

      this._subscription = obs.subscribe({
        next: (value) => this._updateView(value),
        error: (error) => {
          this._context.error = error;
          this.errorHandler.handleError(error);
          this._cdrMarkForCheck();
        },
        complete: () => {
          this._context.complete = true;
          this._cdrMarkForCheck();
        },
      });
      return;
    }

    // Estrategia para Promesas
    if (obj && 'then' in obj) {
      const promise = obj as PromiseLike<T>;
      promise.then(
        (value) => this._updateView(value),
        (error) => {
          this._context.error = error;
          this.errorHandler.handleError(error);
          this._cdrMarkForCheck();
        },
      );
      // Las promesas no se pueden cancelar fácilmente sin AbortController,
      // pero limpiamos la referencia en _dispose.
      return;
    }
  }

  private _dispose(): void {
    if (this._subscription && 'unsubscribe' in this._subscription) {
      (this._subscription as Subscription).unsubscribe();
    }
    this._subscription = null;
  }

  private _updateView(value: T | null): void {
    // Actualizamos el contexto ($implicit y el alias)
    this._context.$implicit = value;
    this._context.rxLet = value;

    // Solo marcamos para chequeo si estamos en modo asíncrono
    // (si es síncrono, Angular ya detectará el cambio en el ciclo actual)
    if (this._markForCheckOnValueUpdate) {
      this._cdrMarkForCheck();
    }
  }

  private _cdrMarkForCheck(): void {
    if (this._ref) {
      this._ref.markForCheck(); // Marca la vista embebida
      this.cdr.markForCheck(); // Marca el componente padre (por si acaso)
    }
  }

  // Type Guard estático para ayudar al template checking
  static ngTemplateContextGuard<T>(
    dir: RxLetDirective<T>,
    ctx: any,
  ): ctx is RxLetContext<T> {
    return true;
  }
}
