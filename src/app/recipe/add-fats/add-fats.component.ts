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

  fat = { nameEn: "",nameNl: "", value: "",type:"fat"};
  fats;
  sfat;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router,private recipeS:RecipeService ) { }

  ngOnInit(): void {
    this.recipeS.getAllfats().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.fats = res.data        
      }
    })
  }

  addFat(form:NgForm) {
    console.log(this.fat)   
    this.recipeS.createIngredient(this.fat).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Fat Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  
  update(edit,i) {
    this.sfat = this.fats[i];
    // console.log(this.sProtein);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title',centered: true, windowClass: "dark-modal" });
  }

  updateFat() {
    this.recipeS.updateIngredient(this.sfat._id, this.sfat).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Fat Updated!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deletefat(fatId,i) {
    console.log(fatId)
    this.recipeS.deleteIngredient(fatId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.fats.splice(i, 1);
        this.toastr.success("Fat Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

}
