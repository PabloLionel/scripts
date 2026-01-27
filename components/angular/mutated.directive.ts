import { 
  Directive, 
  ElementRef, 
  EventEmitter, 
  OnDestroy, 
  OnInit, 
  Output, 
  Input 
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { fromMutationObserver } from './mutation-observer.util';

/**
 * @example
 * ```html
 * <div (mutated)="handleClassChange($event)">
 *   Contenido que al cambiar disparará el evento
 * </div>
 * ```
 * @param element El HTMLElement a observar.
 * @param config Configuración opcional para el MutationObserver.
 */
@Directive({
  // Al usar 'mutated' entre corchetes, Angular busca el atributo o el binding de salida
  selector: '[mutated]', 
  standalone: true
})
export class MutatedDirective implements OnInit, OnDestroy {
  /**
   * Al llamarse igual que el selector, la directiva se activa 
   * automáticamente al usar (mutated) en el HTML.
   */
  @Output() mutated = new EventEmitter<MutationRecord[]>();

  @Input() mutationConfig: MutationObserverInit = { 
    attributes: true, 
    childList: true, 
    subtree: true 
  };

  private destroy$ = new Subject<void>();

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    fromMutationObserver(this.host.nativeElement, this.mutationConfig)
      .pipe(takeUntil(this.destroy$))
      .subscribe((mutations) => {
        this.mutated.emit(mutations);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
