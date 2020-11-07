import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkoutService } from '../services/workout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-workout',
  templateUrl: './all-workout.component.html',
  styleUrls: ['./all-workout.component.css']
})
export class AllWorkoutComponent implements OnInit {

  page = 1;
  collSize = 0;
  numOfItems = 10;

  workouts;


  constructor(private router:Router, private actRout: ActivatedRoute,private workoutS:WorkoutService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.page = parseInt(qparams.get('page'));
      this.workoutS.getAllUserWorkouts({page:this.page,numOfWorkouts:this.numOfItems}).subscribe(res => {
        if (res.status === true) {
          this.workouts = res.data;
          this.collSize = res.tcount;
        }
      })
    })
  }

  
  DelWorkOut(workout,i) {
    this.workoutS.deleteWorkout(workout).subscribe(res => {
      if (res.status === true) {
        this.toastr.success("WorkOut Deleted!", 'Success!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        this.workouts.splice(i,1)
      } else {
        this.toastr.error(res.message, 'Oops!', { timeOut: 3000, closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
        
      
    })
  }

  pagination(val) {
    this.router.navigate([], {
      queryParams: { page: (val) ? val : 1 },
      queryParamsHandling: 'merge'
    });
  }

}
