import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-fats',
  templateUrl: './add-fats.component.html',
  styleUrls: ['./add-fats.component.css']
})
export class AddFatsComponent implements OnInit {

  fat = {
    nameEn: "",
    nameNl: "",
    value: "",
    type: "fat",
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
  fats;
  sfat;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private recipeS: RecipeService) { }

  ngOnInit(): void {
    this.recipeS.getAllfats().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.fats = res.data
      }
    })
  }

  addFat(form: NgForm) {
    console.log(this.fat)
    this.recipeS.createIngredient(this.fat).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.fat.productType = [];
        this.fat.parentCategory = '';
        this.fat.score = null;
        this.toastr.success("Fat Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  change(e) {
    console.log(e);
    this.fat.parentCategory = e;
  }

  changeScore(e) {
    console.log(e);
    this.fat.score = Number(e);
  }

  addProductCategory(e) {
    console.log(e);
    if (this.fat.productType.includes(e)) {
      let i = this.fat.productType.indexOf(e)
      if (i > -1) {
        this.fat.productType.splice(i, 1);
      }
    } else {
      this.fat.productType.push(e);
    }
    console.log(this.fat.productType)
  }


  update(edit, i) {
    this.sfat = this.fats[i];
    console.log(this.sfat);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  changeUpdate(e) {
    console.log(e);
    this.sfat.parentCategory = e;
  }

  changeScoreUpdate(e) {
    console.log(e);
    this.sfat.score = Number(e);
  }

  addProductCategoryUpdate(e) {
    console.log(e);
    if (this.sfat.productType.includes(e)) {
      let i = this.sfat.productType.indexOf(e)
      if (i > -1) {
        this.sfat.productType.splice(i, 1);
      }
    } else {
      this.sfat.productType.push(e);
    }
    console.log(this.sfat.productType)
  }

  updateFat() {
    this.recipeS.updateIngredient(this.sfat._id, this.sfat).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fat Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deletefat(fatId, i) {
    console.log(fatId)
    this.recipeS.deleteIngredient(fatId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.fats.splice(i, 1);
        this.toastr.success("Fat Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
