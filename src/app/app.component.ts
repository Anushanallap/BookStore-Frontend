import { Component } from '@angular/core';

/* This is a decorator. It is a function that takes a class as an argument and returns a class. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BookStore';
}
