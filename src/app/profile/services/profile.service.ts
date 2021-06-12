import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  onFirstComponentLoad() {
    this.invokeFirstComponentFunction.emit();
  }

  getUserProfile() {
    return this.http.get('/user/getprofile');
  }

  updateProfilePic(pic) {
    return this.http.put('/user/profilePic', pic);
  }

  updateProfile(data){
    return this.http.put('/user/updateprofiledata', data);
  }

  sendImageChangeEvent() {
    this.subject.next();
  }

  getImageChangeEvent():Observable<any> {
    return this.subject.asObservable();
  }

}
