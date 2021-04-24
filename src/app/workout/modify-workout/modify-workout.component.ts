import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { WorkoutService } from '../services/workout.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
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
    descriptionNl: "", muscleGroup: "", excercises: [], pricing: "", timeLines: [], featureImage: ""
  }
  equipment = ["None", "Gluteband", "Resistance Band", "Dumbell", "Barbell", "Rings", "Cable station", "Acces to gym"];
  difficulty = ["Beginner", "Intermediate", "Advanced", "Pro"];
  specification = ["Full body", "Core", "Glutes", "Upper body", "Lower body"];
  categories = ["Fit body", "Fat Burning"]
  // muscle = ["Quadriceps","Glutes","Hamstring","Chest","Lats","Shoulder","Biceps","Triceps","Core","Calfs","Upper Traps","Bag","Mobility"]
  muscle = [] as any;
  fileName;
  file;
  imageUrl: string | ArrayBuffer = "";
  enImageUrl = environment.imgUrl;
  musclesChild = [] as any;
  subscription: Subscription;
  rememberMe: string;
  fitBody = false;
  fatBurning = false;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private toastr: ToastrService, private router: Router, private workoutS: WorkoutService, private modalService: NgbModal,
    private sharedService: SharedService) {
    this.subscription = this.sharedService.getMessage().subscribe(message => {
      if (message) {
        this.workout = message;
        console.log(this.workout);
        this.workout.categories.includes('Fit body') ? this.fitBody = true : this.fitBody = false;
        this.workout.categories.includes('Fat Burning') ? this.fatBurning = true : this.fatBurning = false;
        this.workout['_id'] = message._id;
        this.imageUrl = message.featureImage.m;
        console.log('imageUrl === ', this.imageUrl)
      }
    })
  }


  ngOnInit(): void {
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

  modifyWorkout() {
    console.log(this.workout);
    this.workoutS.modifyWorkout(this.workout, this.file).subscribe(res => {
      if (res.status == true) {
        this.toastr.success("WorkOut Modified!", 'Success!', { timeOut: 2000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        setTimeout(() => this.router.navigateByUrl('/workout/all'), 500)
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })
  }

  getAllParentMuscles() {
    this.workoutS.getAllParentCategories().subscribe(res => {
      this.muscle = res.data;
      this.muscle['quadriceps'] = this.muscle.filter(x => x.categoryType == 'quadriceps');
      this.muscle['glutes'] = this.muscle.filter(x => x.categoryType == 'glutes');
      this.muscle['hamstring'] = this.muscle.filter(x => x.categoryType == 'hamstring');
      this.muscle['chest'] = this.muscle.filter(x => x.categoryType == 'chest');
      this.muscle['lats'] = this.muscle.filter(x => x.categoryType == 'lats');
      this.muscle['shoulder'] = this.muscle.filter(x => x.categoryType == 'shoulder');
      this.muscle['biceps'] = this.muscle.filter(x => x.categoryType == 'biceps');
      this.muscle['triceps'] = this.muscle.filter(x => x.categoryType == 'triceps');
      this.muscle['core'] = this.muscle.filter(x => x.categoryType == 'core');
      this.muscle['calfs'] = this.muscle.filter(x => x.categoryType == 'calfs');
      this.muscle['upperTraps'] = this.muscle.filter(x => x.categoryType == 'upperTraps');
      this.muscle['bag'] = this.muscle.filter(x => x.categoryType == 'bag');
      this.muscle['mobility'] = this.muscle.filter(x => x.categoryType == 'mobility');
    })
  }

  openchildMuscle(openChildMuscles, id, name) {
    this.workout.muscleGroup = '';
    this.workout.excercises = [];
    this.workout.muscleGroup = name;
    this.workoutS.getAllParentChildCategories(id).subscribe(res => {
      this.musclesChild = res.data;
      this.modalService.open(openChildMuscles, { windowClass: "dark-modal", size: 'lg', centered: true })
    })
  }

  addExcersise(id) {
    this.workout.excercises.push(id);
  }
  removeExcersise(id) {
    this.workout.excercises = this.workout.excercises.filter(ele => ele != id);
  }

  addCategory(c) {
    console.log(c)
    if (this.workout.categories.includes(c)) {
      let i = this.workout.categories.indexOf(c)
      if (i > -1) {
        this.workout.categories.splice(i, 1);
      }
    } else {
      this.workout.categories.push(c);
    }
    console.log(this.workout.categories)
  }

  deleteTimeline(index: any) {
    this.workout.timeLines.splice(index, 1);
  }

  addToTimeline(item: any) {
    this.workout.timeLines.push(item.name);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
