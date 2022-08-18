import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking_info } from '@app/models';
import { StaffParking } from '@app/models';
import { Observable } from 'rxjs';

// import { OktaAuthService } from '@okta/okta-angular';
// import { Product } from './product';

const baseUrl = 'https://admin.fivercast.com/api';

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
    // return;
    const l1 =[];
    const l2 =[];
    const l3 =[];
    const l4 =[];
    for (var val of booking.staffs) {
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
    ;

    return this.http.post(`${baseUrl}/bookStaff`, booking, { responseType: 'text' });
  }

  // Get all the staff and parking types
  getStaffParking() : Observable<StaffParking> {
    return this.http.get<StaffParking>(`${baseUrl}/bookStaff`);

  }



}
