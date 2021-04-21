import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkoutService } from '../services/workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/shared.service';

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
  subscription: Subscription;


  constructor(private router:Router, private actRout: ActivatedRoute,private workoutS:WorkoutService, private toastr: ToastrService,
    private sharedService: SharedService) { 
  }

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

  editWorkout(data) {
    debugger
    setTimeout(() => {
      this.sharedService.sendMessage(data);
    }, 300);
    // this.router.navigate(['/workout/modifyworkout'], {
    //   replaceUrl: true
    // });
  }

  pagination(val) {
    this.router.navigate([], {
      queryParams: { page: (val) ? val : 1 },
      queryParamsHandling: 'merge'
    });
  }

}
