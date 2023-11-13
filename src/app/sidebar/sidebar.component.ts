import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
        this.darkMode = true;
      } else {
        document.documentElement.classList.remove('dark');
        this.darkMode = false;
      }
    } else {
      localStorage.setItem('theme', 'light');
    }
  }
  darkMode = false;
  isSidebarFixed = true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollY = window.scrollY;

    this.isSidebarFixed = scrollY > 100;
  }

  @HostBinding('class.dark') get isDarkMode() {
    return this.darkMode;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;

    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    this.darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
}
