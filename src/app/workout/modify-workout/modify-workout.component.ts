import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-modify-workout',
  templateUrl: './modify-workout.component.html',
  styleUrls: ['./modify-workout.component.css']
})
export class ModifyWorkoutComponent implements OnInit {

  workout = {
    nameEn: "", nameNl: "", workoutUrl: "", time: "", videoUrl: "", type: "", specification: '',
    difficulityLevel: "", sweatFactor: "", categories: [], equipment: [], descriptionEn: "",
    descriptionNl: "", muscleGroup: "", excercises: [] , pricing: "", timeLines: []
  }
  env = environment.imgUrl;

  diffculity = ["None", "Gluteband", "Resistance Band", "Dumbell","Barbell", "Rings", "Cable station", "Acces to gym"];
  sweat = ["Beginner", "Intermediate", "Advanced","Pro"];
  specification = ["Full body", "Core", "Glutes", "Upper body", "Lower body"];
  categories = ["Fit body", "Fat Burning"]
  // muscle = ["Quadriceps","Glutes","Hamstring","Chest","Lats","Shoulder","Biceps","Triceps","Core","Calfs","Upper Traps","Bag","Mobility"]
  muscle = [] as any;
  fileName;
  file;
  imageUrl: string | ArrayBuffer = "";
  musclesChild = [] as any;
  
  subscription: Subscription;

  rememberMe: string;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(private toastr: ToastrService, private router: Router, private workoutS: WorkoutService, private modalService: NgbModal,
    private sharedService: SharedService) {
      debugger
      this.subscription = this.sharedService.getMessage().subscribe(message => {
        if (message) {
          console.log("msg",message)
          this.workout = message;
          // this.workout.categories["checked"] = true;
          // this.workout.categories[1] = true;
          // this.workout.specification = 'true';
          // this.workout.categories = this.workout.categories.filter(x => x == "Fit body");
        }
      }) 
  }


  ngOnInit(): void {
    // this.workout.timeLines = [
    //   {_id:1000, name:"Fit Body"},
    //   {_id:1000, name:"Core"},
    //   {_id:1000, name:"Glutes"}
    // ]
    this.getAllParentMuscles();
  }


  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  Addworkout() {
    this.workoutS.createWorkout(this.workout, this.file).subscribe(res => {
      if (res.status == true) {
        this.toastr.success("WorkOut Published!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        setTimeout(() => this.router.navigateByUrl('/workout/all'), 1000)
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  getAllParentMuscles() {
    this.workoutS.getAllParentCategories().subscribe(res => {
      this.muscle = res.data;
    })
  }

  openchildMuscle(openChildMuscles, id, name) {
    this.workout.muscleGroup = '';
    this.workout.excercises = [];
    this.workout.muscleGroup = name;
    this.workoutS.getAllParentChildCategories(id).subscribe(res => {
      this.musclesChild = res.data;
      this.modalService.open(openChildMuscles, { windowClass: "dark-modal", size: 'lg',centered: true })
    })
  }

  addExcersise(id) {
      this.workout.excercises.push(id); 
  }
  removeExcersise(id) {
    this.workout.excercises = this.workout.excercises.filter(ele => ele != id);
  }
  
  addCategory(c) {
    let check = this.workout.categories.includes(c);
    if (check === true) {
      this.workout.categories = this.workout.categories.filter(ele => ele != c);
    } else {
      this.workout.categories.push(c);
    }
  }

  deleteTimeline(index: any){
    this.workout.timeLines.splice(index, 1);    
}

  addToTimeline(item: any){
    this.workout.timeLines.push(item);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
