import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var s = document.createElement("script");

    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);

  }

}
