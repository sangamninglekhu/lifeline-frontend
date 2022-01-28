import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationExtras } from '@angular/router';
import { Vacancy } from '@app/models';
import { CareerService } from '@app/services';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {

  allVacancy: Vacancy[];
  allVacancyLength: number=0;
  constructor(
    private elementRef: ElementRef,
    private vacancyService: CareerService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    (this.vacancyService.getVancancy().subscribe(
      data => {
        this.allVacancy = data;
        this.allVacancyLength = data.length;
      },
      error => {
        console.log("error: ",error.message,error);
      }));

    //loading all the necessary js files
    var s = document.createElement("script");
    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  /** Navigate to the respective service along with entered search term as parameter */
  onClick(jobId: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "job": jobId
      }
    };
    this.router.navigate(["/applyJob"], navigationExtras);
  }


}
