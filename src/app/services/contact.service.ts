import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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

    // Send message
    sendMessage(contact_message) {
      // let headers = new HttpHeaders({
      //     'Content-Type': 'application/json'
      //      });
      // let options = { headers: headers };
      return this.http.post(`${baseUrl}/contactUs`, contact_message, { responseType: 'text' });
    }

  }
