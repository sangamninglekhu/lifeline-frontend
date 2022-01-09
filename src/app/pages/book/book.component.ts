import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  // LoginForm: FormGroup;
  // productForm: FormGroup;
  // childForm0: FormGroup;
  // childForm1: FormGroup;
  // childForm2: FormGroup;
  submitted = false;
  childCount = 0
  constructor(private fb:FormBuilder) {
    // 1 - Get the values from local storage
    const value = JSON.parse(localStorage.getItem('formValue'));
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
    //   quantities: this.fb.array([]) ,
    // });
    // this.productForm.valueChanges.subscribe(value => {
    //   localStorage.setItem('formValue', JSON.stringify(this.productForm.value));
    // });


    this.bookForm = this.fb.group({
      pname: [value && value.pname || '', Validators.required],
      oname: [value && value.oname || '', Validators.required],
      postcode: [value && value.postcode || '', Validators.required],
      contact: [value && value.contact || '', Validators.required],
      email: [value && value.email || '', Validators.required],
      quantities: this.fb.array([]) ,
      special: [value && value.special || '', Validators.required],
      parking: [value && value.parking || '', Validators.required],
      additional: [value && value.additional || '', Validators.required],
    });

    this.bookForm.valueChanges.subscribe(value => {
      localStorage.setItem('formValue', JSON.stringify(this.bookForm.value));
    });



  }

  quantities() : FormArray {
    return this.bookForm.get("quantities") as FormArray
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      staff: ['', Validators.required],
      bdate: ['', Validators.required],
      timefrom: ['', Validators.required],
      timeto: ['', Validators.required],
    });
    // this.childCount = this.childCount+1

    // return this.bookForm;

  }

  addQuantity() {

    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number) {
    // this.childCount = this.childCount>0 ? (this.childCount - 1)  : 0;
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log('hello',this.getValidity(0));
    // console.log((<FormArray>this.bookForm.get('quantities')).controls[0]);
    return;
    // Change form status
    this.submitted = true;
    // stop here if form is invalid
    // if (this.childForm0.invalid) {
    //   console.log("passed");
    // }
    // if (this.childForm1.invalid) {
    //   console.log("passed");
    // }
    // if (this.childForm2.invalid) {
    //   console.log("passed");
    // }
    if (this.bookForm.invalid) {
      return;
    }

    console.log(this.bookForm.value);

  }

  getValidity(i) {
  return (<FormArray>this.bookForm.get('quantities')).controls[0].invalid;
}



  // // convenience getter for easy access to contact form fields
  // get f() { return this.productForm.controls; }
  // // convenience getter for easy access to contact form fields
  // get c0() { return this.childForm0.controls; }
  // // convenience getter for easy access to contact form fields
  // get c1() { return this.childForm1.controls; }
  // // convenience getter for easy access to contact form fields
  // get c2() { return this.childForm2.controls; }
  // convenience getter for easy access to contact form fields
  get b() { return this.bookForm.controls; }

  ngOnInit() {
  }

}
