import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacancy } from '@app/models';
import { Observable } from 'rxjs';

// import { OktaAuthService } from '@okta/okta-angular';
// import { Product } from './product';

const baseUrl = 'https://admin.fivercast.com/api';

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

  applyJob(application, slug, fileToUpload: File) {
    // console.log("printing application 1: ",slug, application);
    //
    // delete application['cv'];
    //
    // application['cv'] = fileToUpload.name;
    //
    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);
    formData.append('full_name', application['full_name']);
    formData.append('no_of_days', application['no_of_days']);
    formData.append('phone', application['phone']);
    formData.append('email', application['email']);
    formData.append('drive', application['drive']);
    formData.append('car', application['access_to_car']);
    formData.append('post_code', application['postcode']);
    // application['cv'] = formData;


    // console.log("printing formdata: ", formData);
    return this.http.post(`${baseUrl}/apply/${slug}`, formData,{ responseType: 'text' });
  }


}
