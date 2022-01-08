import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
