import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-inline-calender',
  templateUrl: './inline-calender.component.html',
  styleUrls: ['./inline-calender.component.css']
})
export class InlineCalenderComponent {
  selected: Date | null = new Date();
}
