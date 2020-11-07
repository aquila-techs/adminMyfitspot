import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  createProduct(body): Observable<any> {
    return this.http.post("/product/create", body);
  }

  getProduct(param): Observable<any> {
    return this.http.get("/product/"+param);
  }
  updateProduct(param,body): Observable<any> {
    return this.http.put("/product/"+param,body);
  }
  deleteProduct(param): Observable<any> {
    return this.http.delete("/product/"+param);
  }

  getAllProducts(body): Observable<any> {
    return this.http.post("/product/get/all",body);
  }

}
