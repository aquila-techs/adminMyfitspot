import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { WorkoutService } from './services/workout.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutCategories = { name: "", slug: "", description: "", categoryType: "" } as any;
  // parentCategory = "";
  categories;
  sCategory;

  fileName;
  file;
  fileUrl: string | ArrayBuffer = "";

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService,
    private router: Router, private workoutS: WorkoutService, private activatedRoute: ActivatedRoute) {
    this.workoutCategories.categoryType  = this.activatedRoute.snapshot.url[0].path
     }


  ngOnInit(): void {
    this.workoutS.getAllCategories(this.workoutCategories.categoryType).subscribe(res => {
      if (res.status === true) {
        res.data.forEach((element,index) => {
          res.data[index].name = res.data[index].name == 'null' ? '' : res.data[index].name;
          res.data[index].description = res.data[index].description == 'null' ? '' : res.data[index].description;
        });
        this.categories = res.data
      }
    });
  }

  addCategory(form: NgForm) {
    // if (this.parentCategory !== "") {
    //   this.workoutCategories.parentCategory = this.parentCategory
    // }
    this.workoutS.createWorkOutCategory(this.workoutCategories, this.file).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.file = '';
        this.fileName = '';
        this.fileUrl = '';
        this.toastr.success("Category Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }
  updateCategory() {
    this.workoutS.updateWorkoutCategories(this.sCategory._id, this.sCategory).subscribe(res => {
      if (res.status == true) {
        this.modalService.dismissAll();
        this.ngOnInit();
        this.toastr.success("Category Updated!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  editCategory(edit, i) {
    this.sCategory = this.categories[i];
    this.modalService.open(edit, { ariaLabelledBy: 'modal-basic-title', centered: true, windowClass: "dark-modal" });
  }

  deleteCategory(id, i) {
    if (confirm('Are you sure you want to delete the product?')) {
      this.workoutS.deleteWorkoutCategories(id).subscribe(res => {
        if (res.status === true) {
          this.categories.splice(i, 1);
          this.toastr.success("Workout Category Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        } else {
          this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        }
      })
    } 
  }

  onChange(file: File) {
    // console.log(file)
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.fileUrl = reader.result;
      };
    }
  }

}
