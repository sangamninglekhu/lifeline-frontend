import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import { ContactService } from '@app/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  contactForm2: FormGroup;
  checked: boolean = false;
  defaultState;
  bookingSuccess: boolean=false;
  loading:boolean=false;
  error: string;
  submitted = false;



  constructor(
    private fb:FormBuilder,
    private elementRef: ElementRef,
    private contactService: ContactService
  ) {
    const value = JSON.parse(localStorage.getItem('contactFormValue'));

    // Form group for contact form
    this.contactForm = this.fb.group({
      full_name: [value && value.full_name || '', Validators.required],
      email: [value && value.email || '', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(100)]],
      subject: [value && value.subject || '', Validators.required],
      message: [value && value.message || '', Validators.required]
    });

    // Get the laast state of the contact form
    this.defaultState = this.contactForm.value;

    // Pre-fill the form with previous data. Handy on accidental page refresh or reloads.
    this.contactForm.valueChanges.subscribe(value => {
      localStorage.setItem('contactFormValue', JSON.stringify(this.contactForm.value));
    });

  }

  ngOnInit() {
    var s = document.createElement("script");

    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);

  }


  onSubmit() {


    console.log("contactForm: ", this.contactForm.value);
    console.log("contactForm2: ", this.contactForm2);


    // console.log((<FormArray>this.bookForm.get('staffs')).controls[0]);
    // return;

    // Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      console.log("failed");
      return;
    }

    // if (this.childForm1.invalid) {
    //   console.log("passed");
    // }
    // if (this.childForm2.invalid) {
    //   console.log("passed");
    // }
    // if (this.bookForm.invalid) {
    //   return;
    // }

    //register user
    // return;
  }
  get c() { return this.contactForm.controls; }


}
