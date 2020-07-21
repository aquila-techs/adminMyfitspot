import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';  
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-herbs',
  templateUrl: './add-herbs.component.html',
  styleUrls: ['./add-herbs.component.css']
})
export class AddHerbsComponent implements OnInit {

  herb = { nameEn: "",nameNl: "", value: "",type:"herb"};
  herbs;
  sherb;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService, private router: Router,private recipeS:RecipeService ) { }

  ngOnInit(): void {
    this.recipeS.getAllHerbs().subscribe(res => {
      console.log(res);
      if (res.status == true) {
        this.herbs = res.data        
      }
    })
  }

  addHerb(form:NgForm) {
    console.log(this.herb)    
     this.recipeS.createIngredient(this.herb).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.toastr.success("Herb Added!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }


  update(edit,i) {
    this.sherb = this.herbs[i];
    // console.log(this.sProtein);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title',centered: true, windowClass: "dark-modal" });
  }

  updateHerb() {
    this.recipeS.updateIngredient(this.sherb._id, this.sherb).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.toastr.success("Herb Updated!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});        
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  deleteherbs(herbId,i) {
    console.log(herbId)
    this.recipeS.deleteIngredient(herbId).subscribe(res => {
      console.log(res)
      if (res.status === true) {
        this.herbs.splice(i, 1);
        this.toastr.success("Herb Deleted!", 'Success!', {timeOut: 3000,closeButton: true,progressBar:true,progressAnimation:'decreasing'});
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
     })
  }

}
