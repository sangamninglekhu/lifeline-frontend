import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);

  }

}
