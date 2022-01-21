import { Component, OnInit, ElementRef } from '@angular/core';
import { Vacancy } from '@app/models';
import { CareerService } from '@app/services';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  allVacancy: Vacancy[];

  constructor(
    private elementRef: ElementRef,
    private vacancyService: CareerService

  ) { }

  ngOnInit() {
    (this.vacancyService.getVancancy().subscribe(
      data => {
        this.allVacancy = data;
        console.log("all vacancy: ",this.allVacancy);
      },
      error => {
        console.log("error: ",error.message,error);
      }));
    //loading all the necessary js files

    console.log(this.allVacancy);

    var s = document.createElement("script");
    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
