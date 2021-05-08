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

  vegetable = {
    nameEn: "",
    nameNl: "",
    value: "",
    parentCategory: "Vegetables",
    type: "vegetable",
    productType: [],
    protein: null,
    carbs: null,
    sugar: null,
    fiber: null,
    fats: null,
    recMen: null,
    recWomen: null,
    imageUrl: '',
    score: null
  };
  sVegetable;
  vegetables;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private recipeS: RecipeService) { }

  ngOnInit(): void {
    this.recipeS.getAllVegetables().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.vegetables = res.data
      }
    })
  }

  addVegetable(form: NgForm) {
    console.log(this.vegetable)
    this.recipeS.createIngredient(this.vegetable).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.vegetable.productType = [];
        this.vegetable.parentCategory = '';
        this.vegetable.score = null;
        this.toastr.success("Vegetable Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  change(e) {
    console.log(e);
    this.vegetable.parentCategory = e;
  }

  changeScore(e) {
    console.log(e);
    this.vegetable.score = Number(e);
  }

  addProductCategory(e) {
    console.log(e);
    if (this.vegetable.productType.includes(e)) {
      let i = this.vegetable.productType.indexOf(e)
      if (i > -1) {
        this.vegetable.productType.splice(i, 1);
      }
    } else {
      this.vegetable.productType.push(e);
    }
    console.log(this.vegetable.productType)
  }

  update(edit, i) {
    this.sVegetable = this.vegetables[i];
    console.log(this.sVegetable);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  updateVegetable() {
    console.log(this.sVegetable)
    this.recipeS.updateIngredient(this.sVegetable._id, this.sVegetable).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Vegetable Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  changeUpdate(e) {
    console.log(e);
    this.sVegetable.parentCategory = e;
  }

  changeScoreUpdate(e) {
    console.log(e);
    this.sVegetable.score = Number(e);
  }

  addProductCategoryUpdate(e) {
    console.log(e);
    if (this.sVegetable.productType.includes(e)) {
      let i = this.sVegetable.productType.indexOf(e)
      if (i > -1) {
        this.sVegetable.productType.splice(i, 1);
      }
    } else {
      this.sVegetable.productType.push(e);
    }
    console.log(this.sVegetable.productType)
  }

  deletevegetable(vegId, i) {
    console.log(vegId)
    this.recipeS.deleteIngredient(vegId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.vegetables.splice(i, 1);
        this.toastr.success("Vegetable Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
