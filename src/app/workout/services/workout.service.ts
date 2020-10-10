import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  createWorkOutCategory(body, file: File): Observable<any> {
    let formData = new FormData();
    formData.append("workoutVideo", file);
    formData.append("name", body.name);
    formData.append("slug", body.slug);
    formData.append("description", body.description);
    if (body.parentCategory) {
      formData.append("parentCategory", body.parentCategory);  
    }
    return this.http.post("/workout/categories/create", formData);
  }

  getAllCategories(): Observable<any> {
    return this.http.get("/workout/categories/get/all");
  }
}
