import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';
import {BookingService } from '@app/services';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  bookForm2: FormGroup;
  checked: boolean = false;
  defaultState;
  bookingSuccess: boolean=false;
  loading:boolean=false;
  error: string;

  // LoginForm: FormGroup;
  // productForm: FormGroup;
  // childForm0: FormGroup;
  // childForm1: FormGroup;
  // childForm2: FormGroup;
  submitted = false;
  constructor(
    private fb:FormBuilder,
    private elementRef: ElementRef,
    private bookingService: BookingService
  ) {
    // 1 - Get the values from local storage
    const value = JSON.parse(localStorage.getItem('bookingFormValue'));
    // 2 - Create the form with the values
    // this.LoginForm = fb.group({
    //   firstname: [value && value.firstname || '', Validators.required],
    //   lastname: [value && value.lastname || '', Validators.required]
    // });
    // 3 - Update local storage on every modification
    // this.LoginForm.valueChanges.subscribe(value => {
    //   localStorage.setItem('formValue', JSON.stringify(this.LoginForm.value));
    // });


    // this.productForm = this.fb.group({
    //   name: [value && value.name || '', Validators.required],
    //   staffs: this.fb.array([]) ,
    // });
    // this.productForm.valueChanges.subscribe(value => {
    //   localStorage.setItem('formValue', JSON.stringify(this.productForm.value));
    // });


    this.bookForm = this.fb.group({
      full_name: [value && value.full_name || '', Validators.required],
      company_name: [value && value.company_name || '', Validators.required],
      postcode: [value && value.postcode || '', Validators.required],
      contact: [value && value.contact || '', Validators.required],
      email: [value && value.email || '', Validators.required],
      staffs: this.fb.array([
        this.fb.group({
          staff_id: ['', Validators.required],
          date: ['', Validators.required],
          from: ['', Validators.required],
          to: ['', Validators.required]
        })
      ]) ,
      special_requirement: [value && value.special_requirement || ''],
      parking_id: ['', Validators.required],
      other: [value && value.other || ''],
    });
    this.defaultState = this.bookForm.value;

    this.bookForm.valueChanges.subscribe(value => {
      localStorage.setItem('bookingFormValue', JSON.stringify(this.bookForm.value));
    });
  }

  staffs() : FormArray {
    return this.bookForm.get("staffs") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      staff_id: ['', Validators.required],
      date: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  addQuantity() {
    this.staffs().push(this.newQuantity());
  }

  removeQuantity(i:number) {
    // this.childCount = this.childCount>0 ? (this.childCount - 1)  : 0;
    this.staffs().removeAt(i);
  }

  // Hide remove button for first booking detail
  test(i){
    if(i==0){
      return false;
    } else{
      return true;
    }
  }

  // Reset form
  clear(){
    this.bookForm.reset(
      this.defaultState
    );
    this.bookForm.reset({
      staffs: this.bookForm.get('staffs').value,
      parking: this.bookForm.get('parking').value
    });
  }

  onSubmit() {


    console.log("after ", this.bookForm.value);
    console.log("data2", this.bookForm2);


    // console.log((<FormArray>this.bookForm.get('staffs')).controls[0]);
    // return;

    // Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.bookForm.invalid) {
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
    this.bookingService.addBooking(this.bookForm.value)
    .subscribe(
      data => {
        this.bookingSuccess = true;
        this.loading = false;
        console.log("success: ",data);

      },
      error => {
        this.bookingSuccess = false;
        this.loading = false;
        this.error = error.error.message;
        console.log("error: ",error.message,error);
      });

    }

    getValidity(i) {
      return (<FormArray>this.bookForm.get('staffs')).controls[i].invalid;
    }

    get b() { return this.bookForm.controls; }

    ngOnInit() {
      var s = document.createElement("script");
      s.src = "../../assets/js/aivons.js";
      this.elementRef.nativeElement.appendChild(s);

    }

  }
