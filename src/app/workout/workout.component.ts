import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { WorkoutService } from './services/workout.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {

  workoutCategories = { name: "", slug: "", description: "", categoryType: "", videoUrl: "" } as any;
  enImageUrl = environment.imgUrl;
  categories;
  sCategory;
  fileName;
  file;
  imageFile;
  imageUpdateFile;
  fileUrl: string | ArrayBuffer = "";
  imageUrl: string | ArrayBuffer = '';
  imageUpdateUrl: string | ArrayBuffer = '';
  cateImage;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private modalService: NgbModal, private toastr: ToastrService,
    private router: Router, private workoutS: WorkoutService, private activatedRoute: ActivatedRoute) {
    this.workoutCategories.categoryType = this.activatedRoute.snapshot.url[0].path
  }


  ngOnInit(): void {
    this.workoutS.getAllCategories(this.workoutCategories.categoryType).subscribe(res => {
      if (res.status === true) {
        res.data.forEach((element, index) => {
          res.data[index].name = res.data[index].name == 'null' ? '' : res.data[index].name;
          res.data[index].description = res.data[index].description == 'null' ? '' : res.data[index].description;
        });
        this.categories = res.data
        console.log('categories ===> ',this.categories);
      }
    });
  }

  addCategory(form: NgForm) {
    console.log(this.workoutCategories.description);
    console.log(this.workoutCategories.description);
    this.workoutS.createWorkOutCategory(this.workoutCategories, this.file, this.imageFile).subscribe(res => {
      if (res.status == true) {
        this.ngOnInit();
        form.reset();
        this.file = '';
        this.fileName = '';
        this.fileUrl = '';
        this.imageUrl = '';
        this.toastr.success("Category Added!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  updateCategory() {
    console.log(this.sCategory);
    console.log(this.sCategory.description);
    this.workoutS.updateWorkoutCategories(this.sCategory._id, this.sCategory, this.imageUpdateFile).subscribe(res => {
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
    console.log(this.sCategory);
    this.cateImage = this.sCategory.image;
    console.log(this.cateImage);
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

  onImageChange(file: File) {
    console.log(file);
    if (file) {
      this.fileName = file.name;
      this.imageFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imageUrl = reader.result;
        console.log('image url === ', this.imageUrl);
      };
    }
  }

  onImageUpdateChange(file: File) {
    console.log(file);
    if (file) {
      this.fileName = file.name;
      this.imageUpdateFile = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imageUpdateUrl = reader.result;
        console.log('image url === ', this.imageUrl);
      };
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
