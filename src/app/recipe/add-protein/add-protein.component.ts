import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-protein',
  templateUrl: './add-protein.component.html',
  styleUrls: ['./add-protein.component.css']
})
export class AddProteinComponent implements OnInit {

  protein = {
    nameEn: "",
    nameNl: "",
    value: "",
    type: "protein",
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
  proteins;
  sProtein;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router, private recipeS: RecipeService) { }

  ngOnInit(): void {
    this.recipeS.getAllProtein().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.proteins = res.data
      }
    })
  }

  addProtein(form: NgForm) {
    console.log(this.protein)
    this.recipeS.createIngredient(this.protein).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.protein.productType = [];
        this.protein.parentCategory = '';
        this.protein.score = null;
        this.toastr.success("Protein Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  change(e) {
    console.log(e);
    this.protein.parentCategory = e;
  }

  changeScore(e) {
    console.log(e);
    this.protein.score = Number(e);
  }

  addProductCategory(e) {
    console.log(e);
    if (this.protein.productType.includes(e)) {
      let i = this.protein.productType.indexOf(e)
      if (i > -1) {
        this.protein.productType.splice(i, 1);
      }
    } else {
      this.protein.productType.push(e);
    }
    console.log(this.protein.productType)
  }

  update(edit, i) {
    this.sProtein = this.proteins[i];
    console.log(this.sProtein);
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  changeUpdate(e) {
    console.log(e);
    this.sProtein.parentCategory = e;
  }

  changeScoreUpdate(e) {
    console.log(e);
    this.sProtein.score = Number(e);
  }

  addProductCategoryUpdate(e) {
    console.log(e);
    if (this.sProtein.productType.includes(e)) {
      let i = this.sProtein.productType.indexOf(e)
      if (i > -1) {
        this.sProtein.productType.splice(i, 1);
      }
    } else {
      this.sProtein.productType.push(e);
    }
    console.log(this.sProtein.productType)
  }

  updateProtein() {
    this.recipeS.updateIngredient(this.sProtein._id, this.sProtein).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Protein Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteprotein(proteinId, i) {
    console.log(proteinId)
    this.recipeS.deleteIngredient(proteinId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.proteins.splice(i, 1);
        this.toastr.success("Protein Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

}
