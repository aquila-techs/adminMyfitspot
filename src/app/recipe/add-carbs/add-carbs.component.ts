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

  carb = {
    nameEn: "",
    nameNl: "",
    value: "",
    type: "carb",
    parentCategory: "",
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
    this.recipeS.getAllCarbs().subscribe(res => {
      if (res.status == true) {
        this.carbs = res.data
      }
    })
  }

  addCarb(form: NgForm) {
    console.log(this.carb);
    this.recipeS.createIngredient(this.carb).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.carb.productType = [];
        this.carb.parentCategory = '';
        this.carb.score = null;
        this.toastr.success("Carb Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
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

  update(edit, i) {
    this.sCarb = this.carbs[i];
    console.log(this.sCarb);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', size: 'lg', centered: true, windowClass: "dark-modal" });
  }

  updateCarb() {
    console.log(this.sCarb);
    this.recipeS.updateIngredient(this.sCarb._id, this.sCarb).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fat Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteCarb(carbId, i) {
    this.recipeS.deleteIngredient(carbId).subscribe(res => {
      if (res.status === true) {
        this.carbs.splice(i, 1);
        this.toastr.success("Carb Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }
}
