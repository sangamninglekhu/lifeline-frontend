import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router, NavigationStart, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { CareerService } from '@app/services';

@Component({
  selector: 'app-jobapply',
  templateUrl: './jobapply.component.html',
  styleUrls: ['./jobapply.component.css']
})
export class JobapplyComponent implements OnInit {

  // Initializing required variables
  jobForm: FormGroup;
  defaultState;
  jobSuccess: boolean = false;
  fileToUpload: File | null = null;
  vacancyId: string;
  submitted:boolean = false;

  constructor(
    private fb:FormBuilder,
    private elementRef: ElementRef,
    private careerService: CareerService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {

    // Get the last values of the form
    const value = JSON.parse(localStorage.getItem('jobFormValue'));
    this.jobForm = this.fb.group({
      full_name: [value && value.full_name || '', Validators.required],
      no_of_days: [value && value.no_of_days || '', Validators.required],
      phone: [value && value.phone || '', Validators.required],
      email: [value && value.email || '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(100)]],
      drive: [value && value.drive || '', Validators.required],
      access_to_car: [value && value.access_to_car || '', Validators.required],
      postcode: [value && value.postcode || '', [Validators.required, Validators.pattern("([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})")]],
      cv: [value && value.cv || '', Validators.required],
    });

    // Get the last state of the contact form
    this.defaultState = this.jobForm.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.jobForm.valueChanges.subscribe(value => {
      localStorage.setItem('jobFormValue', JSON.stringify(this.jobForm.value));
    });

  }

  ngOnInit() {
    // Receive the identification term of vacancy
    this.activatedRoute.queryParams.subscribe(params => {
      this.vacancyId = params["job"];
    });
    // this.sortData();

  }

  // Function to run after form submission
  onSubmit() {
    this.submitted=true;
    // stop here if form is invalid
    if (this.jobForm.invalid) {
      console.log("form failed");
      return;
    }

    (this.careerService.postFile(this.jobForm.value).subscribe(
      data => {
        // this.allVacancy = data;
        console.log("Success : ",data);
      },
      error => {
        console.log("error: ",error.message,error);
      }));
    }

    // Getter for easy access to form fields
    get c() { return this.jobForm.controls; }

    // Reset form 
    clear(){
      this.jobForm.reset({
        drive:"",
        access_to_car:"",
        no_of_days: ""
      });
    }

    // Handling files for CV form field
    handleFileInput(files: FileList) {
      this.fileToUpload = files.item(0);
    }


  }
