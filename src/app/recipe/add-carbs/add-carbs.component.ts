import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-add-carbs',
  templateUrl: './add-carbs.component.html',
  styleUrls: ['./add-carbs.component.css']
})
export class AddCarbsComponent implements OnInit {

  carb = { nameEn: "",nameNl: "", value: "",type:"carb"};
  carbs;
  sCarb;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router,private recipeS:RecipeService ) { }

  ngOnInit(): void {
    this.recipeS.getAllCarbs().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.carbs = res.data        
      }
    })
  }

  addCarb(form:NgForm) {
    console.log(this.carb)    
    this.recipeS.createIngredient(this.carb).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Carb Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  update(edit,i) {
    this.sCarb = this.carbs[i];
    // console.log(this.sProtein);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title',centered: true, windowClass: "dark-modal" });
  }

  updateCarb() {
    this.recipeS.updateIngredient(this.sCarb._id, this.sCarb).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fat Updated!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteCarb(carbId,i) {
    console.log(carbId)
    this.recipeS.deleteIngredient(carbId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.carbs.splice(i, 1);
        this.toastr.success("Carb Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

}
