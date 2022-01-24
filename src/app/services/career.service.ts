import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacancy } from '@app/models';
import { Observable } from 'rxjs';

// import { OktaAuthService } from '@okta/okta-angular';
// import { Product } from './product';

const baseUrl = 'https://admin.lifelinerecruitment.com/api';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(
    // public oktaAuth: OktaAuthService,
    private http: HttpClient) {
  }

  // Get all the open vacancies
  getVancancy() : Observable<Vacancy[]> {
    // return Observable.create(observer => {
    //        this.http.get(`${baseUrl}/careerOpportunities`).map(response => response.json();
    //    })
    return this.http.get<Vacancy[]>(`${baseUrl}/careerOpportunities`);

  }

  postFile(job) {
    // const endpoint = 'your-destination-url';
    // const formData: FormData = new FormData();
    // formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(`${baseUrl}/careerOpportunities`, job);
      // .map(() => { return true; })
      // .catch((e) => this.handleError(e));
}


}
