import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule,TabsModule, NgxGalleryModule,FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  member : Member | undefined
  user : User |undefined
  constructor( private accountService: AccountService, private memberService :MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user
      } 
  })
 }
  ngOnInit(): void {
      this.loadMember()
  }

  loadMember() {
    if (this.user && this.user.username) { 
      this.memberService.getMember(this.user.username).subscribe(member => {
        this.member = member;
      });
    }
  }
  
    
}
  
  

