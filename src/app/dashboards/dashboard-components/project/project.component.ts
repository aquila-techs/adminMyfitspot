import { Component, OnInit } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  partners;
  imgUrl = environment.imgUrl;
  constructor(private dashS: DashboardService) { }
  ngOnInit() {
    this.dashS.getAllPartners().subscribe(res => {
      console.log(res)
      this.partners = res.users
    });
  }
}
