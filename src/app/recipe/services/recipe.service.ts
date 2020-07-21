import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }
  
  createIngredient(body): Observable<any> {
    return this.http.post("/ingredient/create", body);
  }
  getAllCarbs(): Observable<any> {
    return this.http.get("/ingredient/all/carbs");
  }
  getAllfats(): Observable<any> {
    return this.http.get("/ingredient/all/fats");
  }
  getAllFruits(): Observable<any> {
    return this.http.get("/ingredient/all/fruits");
  }
  getAllProtein(): Observable<any> {
    return this.http.get("/ingredient/all/protein");
  }
  getAllVegetables(): Observable<any> {
    return this.http.get("/ingredient/all/vegetables");
  }
  getAllHerbs(): Observable<any> {
    return this.http.get("/ingredient/all/herbs");
  }
  getIngredient(param): Observable<any> {
    return this.http.get("/ingredient/"+param);
  }
  updateIngredient(param,body): Observable<any> {
    return this.http.put("/ingredient/"+param,body);
  }
  deleteIngredient(param): Observable<any> {
    return this.http.delete("/ingredient/"+param);
  }

}
