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

  deleteWorkoutCategories(param): Observable<any> {
    return this.http.delete("/workout/categories/delete/"+param);
  }

  updateWorkoutCategories(param,body): Observable<any> {
    return this.http.put("/workout/categories/update/"+param,body);
  }
  
  createWorkout(body, file: File): Observable<any> {

    let formData = new FormData();
    formData.append("img", file);
    formData.append("nameEn", body.nameEn);
    formData.append("nameNl", body.nameNl);
    formData.append("descriptionEn", body.descriptionEn);
    formData.append("descriptionNl", body.descriptionNl);
    formData.append("difficulityLevel", body.difficulityLevel);
    formData.append("videoUrl", body.videoUrl);
    formData.append("workoutUrl", body.workoutUrl);
    formData.append("time", body.time);
    formData.append("type", body.type);
    formData.append("muscleGroup", body.muscleGroup);
    formData.append("specification", body.specification);
    formData.append("sweatFactor", body.sweatFactor);
    formData.append("pricing", body.pricing);
    formData.append("categories", JSON.stringify(body['categories']));
    formData.append("equipment", JSON.stringify(body['equipment']));
    formData.append("excercises", JSON.stringify(body['excercises']));
    return this.http.post("/workout/create", formData);
  }

  getAllUserWorkouts(body): Observable<any> {
    return this.http.post("/workout/get/user", body);
  }
  getAllParentCategories(): Observable<any> {
    return this.http.get("/workout/categories/get/all/parent");
  }

  getAllParentChildCategories(id:any): Observable<any> {
    return this.http.get("/workout/categories/get/all/parent/children/"+id);
  }

  deleteWorkout(param): Observable<any> {
    return this.http.delete("/workout/" + param);
  }

}
