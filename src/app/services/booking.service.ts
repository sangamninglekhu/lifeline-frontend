import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${baseUrl}/bookStaff`, booking);
  }



}
