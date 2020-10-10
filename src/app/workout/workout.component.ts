import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { WorkoutService } from './services/workout.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutCategories = { name: "", slug: "", description: "" } as any;
  parentCategory = "";
  categories;

  fileName;
  file;
  fileUrl: string | ArrayBuffer = "";

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService,
    private router: Router, private workoutS: WorkoutService) { }


  ngOnInit(): void {
    this.workoutS.getAllCategories().subscribe(res => {
      if (res.status === true) {
        this.categories = res.data
        console.log(this.categories)
      }
    });
  }

  addCategory(form: NgForm) {
    if (this.parentCategory !== "") {
      this.workoutCategories.parentCategory = this.parentCategory
    }
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
  updateCategory(edit, i) {

  }

  deleteCategory(id, i) {

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
