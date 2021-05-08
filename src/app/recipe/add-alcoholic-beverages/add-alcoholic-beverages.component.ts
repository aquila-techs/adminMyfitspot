import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-alcoholic-beverages',
  templateUrl: './add-alcoholic-beverages.component.html',
  styleUrls: ['./add-alcoholic-beverages.component.css']
})
export class AddAlcoholicBeveragesComponent implements OnInit {

  carb = {
    nameEn: "",
    nameNl: "",
    value: "",
    type: "alcoholic-beverages",
    parentCategory: "Alcoholic Beverages",
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
  carbs;
  sCarb;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private recipeS: RecipeService) { }

  ngOnInit(): void {
    this.recipeS.getAlAlcoholicBaverages().subscribe(res => {
      if (res.status == true) {
        this.carbs = res.data
        console.log(this.carbs)
      }
    })
  }

  addCarb(form: NgForm) {
    console.log(this.carb)
    this.recipeS.createIngredient(this.carb).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.carb.productType = [];
        this.carb.parentCategory = '';
        this.carb.score = null;
        this.toastr.success("Alcoholic Beverage!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  change(e) {
    console.log(e);
    this.carb.parentCategory = e;
  }

  changeScore(e) {
    console.log(e);
    this.carb.score = Number(e);
  }

  addProductCategory(e) {
    console.log(e);
    if (this.carb.productType.includes(e)) {
      let i = this.carb.productType.indexOf(e)
      if (i > -1) {
        this.carb.productType.splice(i, 1);
      }
    } else {
      this.carb.productType.push(e);
    }
    console.log(this.carb.productType)
  }

  update(edit, i) {
    this.sCarb = this.carbs[i];
    console.log(this.sCarb);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  changeUpdate(e) {
    console.log(e);
    this.sCarb.parentCategory = e;
  }

  changeScoreUpdate(e) {
    console.log(e);
    this.sCarb.score = Number(e);
  }

  addProductCategoryUpdate(e) {
    console.log(e);
    if (this.sCarb.productType.includes(e)) {
      let i = this.sCarb.productType.indexOf(e)
      if (i > -1) {
        this.sCarb.productType.splice(i, 1);
      }
    } else {
      this.sCarb.productType.push(e);
    }
    console.log(this.sCarb.productType)
  }

  updateCarb() {
    this.recipeS.updateIngredient(this.sCarb._id, this.sCarb).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Alcoholic Beverage Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteCarb(carbId, i) {
    this.recipeS.deleteIngredient(carbId).subscribe(res => {
      if (res.status === true) {
        this.carbs.splice(i, 1);
        this.toastr.success("Alcoholic Beverage Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
