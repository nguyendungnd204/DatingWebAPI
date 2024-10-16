import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { CommonModule, NgFor } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../../home/home.component';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-member-list',
    standalone: true,
    templateUrl: './member-list.component.html',
    styleUrl: './member-list.component.css',
    imports: [CommonModule, MemberCardComponent, RouterModule,RouterOutlet,HomeComponent]
})
export class MemberListComponent implements OnInit {

  members$: Observable<Member[]> | undefined 
  constructor(private memberService: MembersService) {
  
  }
  ngOnInit(): void {
      this.members$= this.memberService.getMembers()
  }
  
}
