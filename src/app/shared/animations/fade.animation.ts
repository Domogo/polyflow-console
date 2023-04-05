import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const fadeAnimation =
    trigger('fade', [
      transition(':enter', [
        animate('90ms ease-in-out',  keyframes([
          style({opacity: 0}),
          style({opacity: 1}),
        ]))
      ]),
      transition(':leave', [
        animate('90ms ease-in-out',  keyframes([
          style({opacity: 1}),
          style({opacity: 0}),
        ]))
      ]),
    ])

export const fadeNoExitAnimation = 
    trigger('fadeNoExit', [
        transition(':enter', [
        animate('90ms ease-in-out',  keyframes([
            style({opacity: 0}),
            style({opacity: 1}),
        ]))
        ]),
        transition(':leave', [
        animate('0ms ease-in-out',  keyframes([
            style({opacity: 1}),
            style({opacity: 0}),
        ]))
        ]),
    ])