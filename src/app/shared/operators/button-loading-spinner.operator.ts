import { UnaryOperator } from "@angular/compiler"
import { catchError, Observable, pipe, tap, throwError, UnaryFunction } from "rxjs"

export function buttonLoadingSpinner<T>(event: Event): UnaryFunction<Observable<T>, Observable<T>> {
    var element = event.target as Element
    if(element.tagName !== 'BUTTON') { element = (element.parentElement as Element)}
    element.classList.add('button---loading')

    return pipe(
      tap(x => {
        element.classList.remove('button---loading')
      }),
      catchError(err => {
        element.classList.remove('button---loading')
        return throwError(err)
      })
    )
}

export function genericSpinnerOnElement<T>(element: HTMLElement | null): UnaryFunction<Observable<T>, Observable<T>> {
  if(!element) { return pipe()}
  element.classList.add('button---loading')

    return pipe(
      tap(x => {
        element.classList.remove('button---loading')
      }),
      catchError(err => {
        element.classList.remove('button---loading')
        return throwError(err)
      })
    )
}