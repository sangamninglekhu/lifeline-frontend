import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {

    //loading all the necessary js files

    var s = document.createElement("script");
    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
