import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  createWorkOutCategory(body, file: File, imageFile: File): Observable<any> {
    let formData = new FormData();
    if (file) {
      formData.append("workoutVideo", file);
    }
    if (imageFile) {
      formData.append("img", imageFile);
    }
    formData.append("name", body.name);
    formData.append("slug", body.slug);
    formData.append("description", body.description);
    formData.append("videoUrl", body.videoUrl);
    if (body.parentCategory) {
      formData.append("parentCategory", body.parentCategory);
    }
    formData.append("categoryType", body.categoryType);
    return this.http.post("/workout/categories/create/", formData);
  }

  getAllCategories(catType: any): Observable<any> {
    let categoryType = {};
    categoryType['categoryType'] = catType;
    return this.http.post('/workout/categories/get/all/parent/children', categoryType);
  }

  deleteWorkoutCategories(param): Observable<any> {
    return this.http.delete("/workout/categories/delete/" + param);
  }

  updateWorkoutCategories(param, body, imageFile: File): Observable<any> {
    console.log(body);
    console.log(imageFile);
    let formData = new FormData();
    if (imageFile) {
      formData.append("img", imageFile);
    }
    formData.append("name", body.name);
    formData.append("slug", body.slug);
    formData.append("description", body.description);
    formData.append("videoUrl", body.videoUrl);
    if (body.parentCategory) {
      formData.append("parentCategory", body.parentCategory);
    }
    formData.append("categoryType", body.categoryType);
    return this.http.put("/workout/categories/update/" + param, formData);
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
    formData.append("numberOfCalories", body.numberOfCalories);
    formData.append("workoutUrl", body.workoutUrl);
    formData.append("time", body.time);
    formData.append("type", body.type);
    formData.append("muscleGroup", body.muscleGroup);
    formData.append("specification", body.specification);
    formData.append("sweatFactor", body.sweatFactor);
    formData.append("pricing", body.pricing);
    formData.append("timeLineCount", body.timeLineCount);
    formData.append("categories", JSON.stringify(body['categories']));
    formData.append("equipment", JSON.stringify(body['equipment']));
    formData.append("excercises", JSON.stringify(body['excercises']));
    formData.append("timeLines", JSON.stringify(body['timeLines']));
    return this.http.post("/workout/create", formData);
  }

  modifyWorkout(body): Observable<any> {
    console.log('body ===========> ', body);
    const id = body.get("id");
    console.log('id in body part ==========> ', id);
    return this.http.put(`/workout/update/${id}`, body);
  }

  getAllUserWorkouts(body): Observable<any> {
    return this.http.post("/workout/get/user", body);
  }

  getAllParentCategories(): Observable<any> {
    return this.http.get("/workout/categories/get/all");
    // return this.http.get("/workout/categories/get/all/parent");
  }

  getAllParentChildCategories(id: any): Observable<any> {
    return this.http.get("/workout/categories/get/all/parent/children/" + id);
  }

  deleteWorkout(param): Observable<any> {
    return this.http.delete("/workout/" + param);
  }

  getCategoryById(id: any) {
    return this.http.get("/workout/categories/get/user/" + id);
  }

}
