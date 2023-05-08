import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notflix';

  selectedPlanIndex: number;

  constructor() {
    this.selectedPlanIndex = 0;
  }

  setPlanIndex(planIndex: any) {
    console.log(planIndex);
  }
}
