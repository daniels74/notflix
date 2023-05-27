import { Component, OnInit } from '@angular/core';
import { AuthService } from '../CoreModule/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  selectedPlanIndex: number;

  constructor(private authService: AuthService) {
    this.selectedPlanIndex = 0;
  }
  ngOnInit() {
    this.authService.liveSessionCheck();
  }

  setPlanIndex(planIndex: any) {
    console.log(planIndex);
  }
}
