import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking_info } from '@app/models';
// import { OktaAuthService } from '@okta/okta-angular';
// import { Product } from './product';

const baseUrl = 'https://admin.lifelinerecruitment.com/api';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    // public oktaAuth: OktaAuthService,
    private http: HttpClient) {
  }

  // Reegister employee
  addBooking(booking) {
    const l1 =[];
    const l2 =[];
    const l3 =[];
    const l4 =[];
    for (var val of booking.staffs) {
      l1.push(val.staff);
      l2.push(val.date);
      l3.push(val.from);
      l4.push(val.to);
    }
    booking['staff']=l1;
    booking['date']=l2;
    booking['from']=l3;
    booking['to']=l4;
    // this.bookForm.addControl('staff', new FormControl(''));
    // this.bookForm.controls['staff'].setValue(l1);
    // this.bookForm.addControl('date', new FormControl(''));
    // this.bookForm.controls['date'].setValue(l2);
    // this.bookForm.addControl('from', new FormControl(''));
    // this.bookForm.controls['from'].setValue(l3);
    // this.bookForm.addControl('to', new FormControl(''));
    // this.bookForm.controls['to'].setValue(l4);

    // this.bookForm2=this.bookForm.value;
    delete booking['staffs'];
    console.log('hi1!!!!! ', booking);
    ;

    return this.http.post(`${baseUrl}/bookStaff`, booking);
  }



}
