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

  fruit = {
    nameEn: "",
    nameNl: "",
    value: "",
    type: "fruit",
    parentCategory: "Fruits",
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
  fruits;
  sfruit;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private recipeS: RecipeService) { }

  ngOnInit(): void {
    this.recipeS.getAllFruits().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.fruits = res.data
      }
    })
  }

  addFruit(form: NgForm) {
    console.log(this.fruit)
    this.recipeS.createIngredient(this.fruit).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.fruit.productType = [];
        this.fruit.parentCategory = '';
        this.fruit.score = null;
        this.toastr.success("Fruit Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  change(e) {
    console.log(e);
    this.fruit.parentCategory = e;
  }

  changeScore(e) {
    console.log(e);
    this.fruit.score = Number(e);
  }

  addProductCategory(e) {
    console.log(e);
    if (this.fruit.productType.includes(e)) {
      let i = this.fruit.productType.indexOf(e)
      if (i > -1) {
        this.fruit.productType.splice(i, 1);
      }
    } else {
      this.fruit.productType.push(e);
    }
    console.log(this.fruit.productType)
  }

  update(edit, i) {
    this.sfruit = this.fruits[i];
    console.log(this.sfruit);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg', windowClass: "dark-modal" });
  }

  changeUpdate(e) {
    console.log(e);
    this.sfruit.parentCategory = e;
  }

  changeScoreUpdate(e) {
    console.log(e);
    this.sfruit.score = Number(e);
  }

  addProductCategoryUpdate(e) {
    console.log(e);
    if (this.sfruit.productType.includes(e)) {
      let i = this.sfruit.productType.indexOf(e)
      if (i > -1) {
        this.sfruit.productType.splice(i, 1);
      }
    } else {
      this.sfruit.productType.push(e);
    }
    console.log(this.sfruit.productType)
  }

  updateFruit() {
    this.recipeS.updateIngredient(this.sfruit._id, this.sfruit).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fruit Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }


  deletefruit(fruitId, i) {
    console.log(fruitId)
    this.recipeS.deleteIngredient(fruitId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.fruits.splice(i, 1);
        this.toastr.success("Fruit Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
