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
  checked: boolean = false;
defaultState;
  // LoginForm: FormGroup;
  // productForm: FormGroup;
  // childForm0: FormGroup;
  // childForm1: FormGroup;
  // childForm2: FormGroup;
  submitted = false;
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
      quantities: this.fb.array([
        this.fb.group({
          staff: ['', Validators.required],
          bdate: ['', Validators.required],
          timefrom: ['', Validators.required],
          timeto: ['', Validators.required]
        })
      ]) ,
      special: [value && value.special || '', Validators.required],
      parking: ['', Validators.required],
      additional: [value && value.additional || '', Validators.required],
    });
    this.defaultState = this.bookForm.value;

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
}

addQuantity() {
  this.quantities().push(this.newQuantity());
}

removeQuantity(i:number) {
  // this.childCount = this.childCount>0 ? (this.childCount - 1)  : 0;
  this.quantities().removeAt(i);
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
        quantities: this.bookForm.get('quantities').value,
        parking: this.bookForm.get('parking').value
    });
}

onSubmit() {
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

}

getValidity(i) {
  return (<FormArray>this.bookForm.get('quantities')).controls[i].invalid;
}

get b() { return this.bookForm.controls; }

ngOnInit() {
}

}
