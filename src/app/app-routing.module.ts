import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CareerComponent } from './pages/career/career.component';
import { AboutComponent } from './pages/about/about.component';
import { BookComponent } from './pages/book/book.component';
import { JobapplyComponent } from './pages/jobapply/jobapply.component';
import { SignupdetailsComponent } from './pages/signupdetails/signupdetails.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: 'career',
    component: CareerComponent
  },
  {
    path: 'applyJob',
    component: JobapplyComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'earlySignUp',
    component: SignupdetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
