import { Component, OnInit, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { BookingService } from "@app/services";
import { Staff, Parking, StaffParking } from "@app/models";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"],
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  bookForm2: FormGroup;
  checked: boolean = false;
  defaultState;
  bookingSuccess: boolean = false;
  loading: boolean = false;
  error: string;
  staffParking: StaffParking;
  staffTypes: Staff[];
  parkingTypes: Parking[];
  checkbox: boolean = false;
  submitted = false;
  formInvalid = false;
  today: string;
  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private bookingService: BookingService
  ) {
    // 1 - Get the values from local storage
    const value = JSON.parse(localStorage.getItem("bookingFormValue"));
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
      full_name: [(value && value.full_name) || "", Validators.required],
      company_name: [(value && value.company_name) || "", Validators.required],
      postcode: [
        (value && value.postcode) || "",
        [
          Validators.required,
          Validators.pattern(
            "([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))s?[0-9][A-Za-z]{2})"
          ),
        ],
      ],
      contact: [(value && value.contact) || "", Validators.required],
      email: [
        (value && value.email) || "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
          Validators.maxLength(100),
        ],
      ],
      staffs: this.fb.array([
        this.fb.group({
          staff_id: ["", Validators.required],
          date: ["", Validators.required],
          from: ["", Validators.required],
          to: ["", Validators.required],
        }),
      ]),
      special_requirement: [(value && value.special_requirement) || ""],
      parking_id: ["", Validators.required],
      other: [(value && value.other) || ""],
    });
    this.defaultState = this.fb.group({
      full_name: [(value && value.full_name) || "", Validators.required],
    });

    this.bookForm.valueChanges.subscribe((value) => {
      localStorage.setItem(
        "bookingFormValue",
        JSON.stringify(this.bookForm.value)
      );
    });

    // Load all the staff and parking types
    this.bookingService.getStaffParking().subscribe(
      (data) => {
        this.staffParking = data;
        this.staffTypes = this.staffParking.staffs;
        this.parkingTypes = this.staffParking.parking_info;
      },
      (error) => {
        this.error = error.error.message;
      }
    );

    // this.staffParking = bookingService.getStaffParking();
    // console.log('staff parking:  ',this.staffParking);
  }

  staffs(): FormArray {
    return this.bookForm.get("staffs") as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      staff_id: ["", Validators.required],
      date: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
    });
  }

  addQuantity() {
    this.staffs().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    // this.childCount = this.childCount>0 ? (this.childCount - 1)  : 0;
    this.staffs().removeAt(i);
  }

  // Hide remove button for first booking detail
  test(i) {
    if (i == 0) {
      return false;
    } else {
      return true;
    }
  }

  // Reset form
  clear() {
    // this.bookForm.controls['full_name'].reset()
    // this.bookForm.reset(
    //   this.defaultState
    // );
    this.bookForm.reset({
      staff_id: "",
      parking_id: "",
    });
  }

  onSubmit() {
    // console.log((<FormArray>this.bookForm.get('staffs')).controls[0]);
    // return;
    // Change form status
    this.submitted = true;

    // stop here if form is invalid
    if (this.bookForm.invalid) {
      this.formInvalid = true;
      console.log(" Invalid form");
      return;
    }
    console.log("form values ", this.bookForm.value);
    this.formInvalid = false;

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
    this.bookingService.addBooking(this.bookForm.value).subscribe(
      (data) => {
        this.bookingSuccess = true;
        this.loading = false;
      },
      (error) => {
        this.bookingSuccess = false;
        this.loading = false;
        this.error = error.error.message;
      }
    );
  }

  getValidity(i) {
    return (<FormArray>this.bookForm.get("staffs")).controls[i].invalid;
  }

  get c() {
    return this.bookForm.controls;
  }

  ngOnInit() {
    this.today = new Date().toISOString().slice(0, 10);
    console.log(this.today);

    var s = document.createElement("script");
    s.src = "../../assets/js/aivons.js";
    this.elementRef.nativeElement.appendChild(s);
  }
}
