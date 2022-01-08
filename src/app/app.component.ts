import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lifeline-frontend';

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var s = document.createElement("script");

    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);

  }

}
