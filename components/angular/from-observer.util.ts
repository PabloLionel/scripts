import { Observable } from 'rxjs';

/**
 * Crea un Observable que emite las mutaciones de un elemento DOM.
 * @param element El HTMLElement a observar.
 * @param config Configuración opcional para el MutationObserver.
 */
export function fromMutationObserver(
  element: HTMLElement,
  config: MutationObserverInit = { attributes: true, childList: true, subtree: true }
): Observable<MutationRecord[]> {
  return new Observable((subscriber) => {
    const observer = new MutationObserver((mutations) => {
      // Emitimos el array de mutaciones detectadas
      subscriber.next(mutations);
    });

    // Comenzamos a observar el elemento
    observer.observe(element, config);

    // Esta función se ejecuta cuando el observable se cancela (unsubscribe)
    return () => {
      observer.disconnect();
    };
  });
}
