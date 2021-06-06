import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get('/user/getprofile');
  }

  updateProfilePic(pic) {
    return this.http.put('/user/profilePic', pic);
  }

  updateProfile(data){
    return this.http.put('/user/updateprofiledata', data);
  }

}
