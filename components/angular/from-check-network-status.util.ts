import { Observable, merge, fromEvent, map, BehaviorSubject } from 'rxjs';

export function fromCheckNetworkStatus(): Observable<boolean> {
  return merge(
    // Estado inicial al suscribirse
    new BehaviorSubject(navigator.onLine),
    // Escucha cuando vuelve la conexión
    fromEvent(window, 'online').pipe(map(() => true)),
    // Escucha cuando se pierde la conexión
    fromEvent(window, 'offline').pipe(map(() => false))
  );
}
