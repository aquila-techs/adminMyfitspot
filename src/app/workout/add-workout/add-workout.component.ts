import { Component, OnInit } from '@angular/core';
import Quill from 'quill';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { WorkoutService } from '../services/workout.service';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent implements OnInit {
  workout = {
    nameEn: '',
    nameNl: '',
    workoutUrl: '',
    time: '',
    videoUrl: '',
    numberOfCalories: null,
    type: '',
    specification: '',
    difficulityLevel: '',
    sweatFactor: '',
    categories: [],
    equipment: [],
    descriptionEn: '',
    descriptionNl: '',
    muscleGroup: '',
    excercises: [],
    pricing: '',
    timeLines: [],
    timeLineName: []
  };
  env = environment.imgUrl;

  equipment = [
    'None',
    'Gluteband',
    'Resistance Band',
    'Dumbell',
    'Barbell',
    'Rings',
    'Acces to gym',
  ];
  diffculity = ['Beginner', 'Intermediate', 'Advanced', 'Pro'];
  specification = ['Full body', 'Core', 'Glutes', 'Upper body', 'Lower body'];
  categories = ['Fit body', 'Fat Burning'];
  // muscle = ["Quadriceps","Glutes","Hamstring","Chest","Lats","Shoulder","Biceps","Triceps","Core","Calfs","Upper Traps","Bag","Mobility"]
  muscle = [] as any;
  fileName;
  file;
  imageUrl: string | ArrayBuffer = '';
  musclesChild = [] as any;
  subscription: Subscription;
  timeLineCount;

  public config: PerfectScrollbarConfigInterface = {};
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private workoutS: WorkoutService,
    private modalService: NgbModal,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.getMessage().subscribe(
      (message) => {
        console.log(message);
        if (message) {
          this.workout = message;
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.getAllParentMuscles();
  }

  onChange(file: File) {
    console.log(file);
    if (file) {
      this.fileName = file.name;
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imageUrl = reader.result;
        console.log('image url === ', this.imageUrl);
      };
    }
  }

  Addworkout() {
    console.log(this.workout);
    this.workoutS.createWorkout(this.workout, this.file).subscribe((res) => {
      if (res.status == true) {
        this.toastr.success('WorkOut Published!', 'Success!', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        setTimeout(() => this.router.navigateByUrl('/workout/all'), 500);
      } else {
        this.toastr.error(res.message, 'Oops!', {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }

  getAllParentMuscles() {
    this.workoutS.getAllParentCategories().subscribe(
      (res) => {
        console.log('MUSCLE CHILDREN RESPONSE === ', res);
        this.muscle = res.data;
        this.muscle['quadriceps'] = this.muscle.filter(
          (x) => x.categoryType == 'quadriceps'
        );
        this.muscle['glutes'] = this.muscle.filter(
          (x) => x.categoryType == 'glutes'
        );
        this.muscle['hamstring'] = this.muscle.filter(
          (x) => x.categoryType == 'hamstring'
        );
        this.muscle['chest'] = this.muscle.filter(
          (x) => x.categoryType == 'chest'
        );
        this.muscle['lats'] = this.muscle.filter((x) => x.categoryType == 'lats');
        this.muscle['shoulder'] = this.muscle.filter(
          (x) => x.categoryType == 'shoulder'
        );
        this.muscle['biceps'] = this.muscle.filter(
          (x) => x.categoryType == 'biceps'
        );
        this.muscle['triceps'] = this.muscle.filter(
          (x) => x.categoryType == 'triceps'
        );
        this.muscle['core'] = this.muscle.filter((x) => x.categoryType == 'core');
        this.muscle['calfs'] = this.muscle.filter(
          (x) => x.categoryType == 'calfs'
        );
        this.muscle['upperTraps'] = this.muscle.filter(
          (x) => x.categoryType == 'upperTraps'
        );
        this.muscle['bag'] = this.muscle.filter((x) => x.categoryType == 'bag');
        this.muscle['mobility'] = this.muscle.filter(
          (x) => x.categoryType == 'mobility'
        );
      });
  }

  openchildMuscle(openChildMuscles, id, name) {
    this.workout.muscleGroup = '';
    this.workout.excercises = [];
    this.workout.muscleGroup = name;
    this.workoutS.getAllParentChildCategories(id).subscribe((res) => {
      this.musclesChild = res.data;
      this.modalService.open(openChildMuscles, {
        windowClass: 'dark-modal',
        size: 'lg',
        centered: true,
      });
    });
  }

  addExcersise(id) {
    this.workout.excercises.push(id);
  }
  removeExcersise(id) {
    this.workout.excercises = this.workout.excercises.filter(
      (ele) => ele != id
    );
  }

  addCategory(c) {
    let check = this.workout.categories.includes(c);
    if (check === true) {
      this.workout.categories = this.workout.categories.filter(
        (ele) => ele != c
      );
    } else {
      this.workout.categories.push(c);
    }
  }

  addEquipment(e) {
    console.log(this.workout.equipment.length)
    // add unique equipment in array logic
    if (this.workout.equipment.length > 0) {
      this.workout.equipment.pop();
      this.workout.equipment.push(e);
    } else {
      this.workout.equipment.push(e);
    }
    console.log(this.workout.equipment)
  }

  deleteTimeline(index: any) {
    this.workout.timeLines.splice(index, 1);
    // this.workout.timeLineName.splice(index, 1);
    console.log(this.workout.timeLines)
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
      count: 0,
      isComplete: false,
      rest: true,
    }
    this.workout.timeLines.push(rest);
    console.log(this.workout.timeLines)
  }

  addToTimeline(item: any) {
    const obj = {
      category_id: item._id,
      name: item.name,
      categoryType: item.categoryType,
      description: item.description,
      slug: item.slug,
      videoUrl: item.videoUrl,
      count: Number(this.timeLineCount),
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
    this.subscription.unsubscribe();
  }
}
