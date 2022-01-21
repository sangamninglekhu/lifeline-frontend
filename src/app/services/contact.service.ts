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
export class ContactService {

  constructor(
    // public oktaAuth: OktaAuthService,
    private http: HttpClient) {
  }

}
