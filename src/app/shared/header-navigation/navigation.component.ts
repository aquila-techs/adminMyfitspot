import { AuthHelperService } from './../../services/authHelper.service';
import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/profile/services/profile.service';
import { environment } from 'src/environments/environment';


declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {

  imageChangeSubscription: Subscription;

  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;

  constructor(
    private modalService: NgbModal,
    private AuthHelperService: AuthHelperService,
    private router: Router,
    private profileService: ProfileService
  ) {
    // this.imageChangeSubscription = this.profileService.getImageChangeEvent().subscribe(() => {
    //   console.log('header function call')
    // })
    if (this.profileService.subsVar == undefined) {
      this.profileService.subsVar = this.profileService.invokeFirstComponentFunction.subscribe(() => {
        console.log('header function call')
      });
    }
   }
  enImageUrl = environment.imgUrl;
  profileImageUrl = '';
  name = '';
  ngOnInit() {
    console.log('header ngOnInit')
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        console.log('profile data in header',data)
        this.name = data.name;
        if(data.profilePic) {
          this.profileImageUrl = `${this.enImageUrl}${data.profilePic}`;
          console.log('profile image url in header', this.profileImageUrl)
          console.log(this.profileImageUrl);
        }
      })
  }

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];

  goToProfile() {
    console.log('profile');
    this.router.navigate(['/profile']);
  }

  logOut() {
    this.AuthHelperService.logOut();
    this.router.navigate(['/login']);
  }

  ngAfterViewInit() {
    console.log('header after view init');

  }
}
