import { Component, OnInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { WorkoutService } from '../services/workout.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "src/environments/environment";
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-workout',
  templateUrl: './modify-workout.component.html',
  styleUrls: ['./modify-workout.component.css']
})
export class ModifyWorkoutComponent implements OnInit {

  workout = {
    nameEn: "", nameNl: "", workoutUrl: "", time: "", videoUrl: "", specification: '',
    difficulityLevel: "", categories: [], equipment: [], descriptionEn: "",
    descriptionNl: "", pricing: "", timeLines: [], featureImage: {}, numberOfCalories: null, timeLineCount: null
  }
  equipment = ["None", "Gluteband", "Resistance Band", "Dumbell", "Barbell", "Rings", "Acces to gym"];
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
  imageForm: FormGroup;
  timeLineCount;
  restCount;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(private toastr: ToastrService, private router: Router, private workoutS: WorkoutService, private modalService: NgbModal,
    private sharedService: SharedService, private formBuilder: FormBuilder) {
    this.subscription = this.sharedService.getMessage().subscribe(message => {
      if (message) {
        this.workout.nameEn = message.nameEn;
        this.workout.nameNl = message.nameNl;
        this.workout.workoutUrl = message.workoutUrl;
        this.workout.time = message.time;
        this.workout.videoUrl = message.videoUrl;
        this.workout.numberOfCalories = message.numberOfCalories;
        this.workout.specification = message.specification;
        this.workout.difficulityLevel = message.difficulityLevel;
        this.workout.categories = message.categories;
        this.workout.equipment = message.equipment;
        this.workout.descriptionEn = message.descriptionEn;
        this.workout.descriptionNl = message.descriptionNl;
        this.workout.pricing = message.pricing;
        this.workout.timeLines = message.timeLines;
        this.workout.timeLineCount = message.timeLineCount;
        this.workout.featureImage = message.featureImage === undefined ? {} : message.featureImage;
        console.log(this.workout);
        this.workout.categories.includes('Fit body') ? this.fitBody = true : this.fitBody = false;
        this.workout.categories.includes('Fat Burning') ? this.fatBurning = true : this.fatBurning = false;
        this.workout['_id'] = message._id;
        console.log(this.workout.featureImage)
        console.log('imageUrl === ', this.imageUrl)
      }
    })
  }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      img: ['']
    })
    console.log(this.imageForm.value)
    this.getAllParentMuscles();
  }

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      this.imageForm.patchValue({
        img: this.file
      });
      console.log(this.imageForm.value);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  modifyWorkout() {
    console.log(typeof(this.workout.timeLineCount));
    const formData = new FormData();
    formData.append("img", this.file);
    formData.append("id", this.workout['_id']);
    formData.append("nameEn", this.workout.nameEn);
    formData.append("nameNl", this.workout.nameNl);
    formData.append("workoutUrl", this.workout.workoutUrl);
    formData.append("time", this.workout.time);
    formData.append("timeLineCount", this.workout.timeLineCount);
    formData.append("videoUrl", this.workout.videoUrl);
    formData.append("numberOfCalories", this.workout.numberOfCalories);
    formData.append("specification", this.workout.specification);
    formData.append("difficulityLevel", this.workout.difficulityLevel);
    formData.append("categories", JSON.stringify(this.workout.categories));
    formData.append("equipment", JSON.stringify(this.workout.equipment));
    formData.append("pricing", this.workout.pricing);
    formData.append("descriptionNl", this.workout.descriptionNl);
    formData.append("descriptionEn", this.workout.descriptionEn);
    formData.append("timeLines", JSON.stringify(this.workout.timeLines));
    formData.append("featureImage", JSON.stringify(this.workout.featureImage));
    this.workoutS.modifyWorkout(formData).subscribe(res => {
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
    console.log('workout.timeLines', this.workout.timeLines)
  }

  onSearchChange(event: any) {
    console.log(event);
    this.timeLineCount = event;
  }

  addRest() {
    const rest = {
      name: "rest",
      description: "rest",
      slug: "rest",
      videoUrl: "",
      count: this.restCount,
      isComplete: false,
      rest: true,
    }
    this.workout.timeLines.push(rest);
    console.log(this.workout.timeLines)
  }

  addToTimeline(item: any) {
    console.log(item)
    const obj = {
      category_id: item._id,
      name: item.name,
      categoryType: item.categoryType,
      description: item.description,
      slug: item.slug,
      videoUrl: item.videoUrl,
      count: this.timeLineCount,
      isComplete: false,
      rest: false
    }
    this.workout.timeLines.push(obj);
    this.timeLineCount = null;
    console.log(item.categoryType);
    (<HTMLInputElement>document.getElementById(`${item.categoryType}-` + `${item._id}`)).value = null;
    console.log(this.workout.timeLines)
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    // this.subscription.unsubscribe();
  }

}
