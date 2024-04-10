import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { HomeComponent } from '../../home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterModule,RouterOutlet,CommonModule,HomeComponent],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {

  @Input() member! : Member;
  constructor() {
    
    
  }
  ngOnInit(): void {
      
  }

}