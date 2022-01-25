import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking_info } from '@app/models';
import { Observable } from 'rxjs';

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
    console.log("printing: ",booking.staffs, booking.staffs.length);
    // return;
    const l1 =[];
    const l2 =[];
    const l3 =[];
    const l4 =[];
    for (var val of booking.staffs) {
      console.log("printing second: ",val, val.staff_id, val.date);
      l1.push(val.staff_id);
      l2.push(val.date);
      l3.push(val.from);
      l4.push(val.to);
    }
    booking['staff_id']=l1;
    booking['date']=l2;
    booking['from']=l3;
    booking['to']=l4;

    // this.bookForm2=this.bookForm.value;
    delete booking['staffs'];
    console.log('hi1!!!!! ', booking);
    ;

    return this.http.post(`${baseUrl}/bookStaff`, booking, { responseType: 'text' });
  }



}
