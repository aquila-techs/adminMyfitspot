import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-vegetables',
  templateUrl: './add-vegetables.component.html',
  styleUrls: ['./add-vegetables.component.css']
})
export class AddVegetablesComponent implements OnInit {

  vegetable = { nameEn: "", nameNl: "", value: "", type: "vegetable" };
  sVegetable;
  vegetables;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router,private recipeS:RecipeService ) { }

  ngOnInit(): void {
    this.recipeS.getAllVegetables().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.vegetables = res.data        
      }
    })
  }

  addVegetable(form:NgForm) {
    console.log(form)    
    this.recipeS.createIngredient(this.vegetable).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Vegetable Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  update(edit,i) {
    this.sVegetable = this.vegetables[i];
    console.log(this.sVegetable);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title',centered: true, windowClass: "dark-modal" });
  }

  updateVegetable() {
    console.log(this.sVegetable)
    this.recipeS.updateIngredient(this.sVegetable._id, this.sVegetable).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Vegetable Updated!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deletevegetable(vegId,i) {
    console.log(vegId)
    this.recipeS.deleteIngredient(vegId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.vegetables.splice(i, 1);
        this.toastr.success("Vegetable Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

}
