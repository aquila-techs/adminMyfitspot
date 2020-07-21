import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-fruit',
  templateUrl: './add-fruit.component.html',
  styleUrls: ['./add-fruit.component.css']
})
export class AddFruitComponent implements OnInit {

  fruit = { nameEn: "",nameNl: "", value: "",type:"fruit"};
  fruits;
  sfruit;
  public config: PerfectScrollbarConfigInterface = {};
  constructor( private modalService: NgbModal, private toastr: ToastrService, private router: Router,private recipeS:RecipeService ) { }

  ngOnInit(): void {
    this.recipeS.getAllFruits().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.fruits = res.data        
      }
    })
  }

  addFruit(form:NgForm) {
    console.log(this.fruit)    
    this.recipeS.createIngredient(this.fruit).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Fruit Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  update(edit,i) {
    this.sfruit = this.fruits[i];
    // console.log(this.sProtein);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title',centered: true, windowClass: "dark-modal" });
  }

  updateFruit() {
    this.recipeS.updateIngredient(this.sfruit._id, this.sfruit).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fruit Updated!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }


  deletefruit(fruitId,i) {
    console.log(fruitId)
    this.recipeS.deleteIngredient(fruitId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.fruits.splice(i, 1);
        this.toastr.success("Fruit Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

}
