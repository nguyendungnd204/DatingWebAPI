import { Component, ElementRef, HostListener, OnInit, ViewChild, viewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../../home/home.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule,TabsModule,FormsModule,PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm | undefined;
  member : Member | undefined
  user : User |undefined
  @HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
    if(this.editForm?.dirty)
      {
        $event.returnValue= true
      }
  }
  constructor( private accountService: AccountService, private memberService :MembersService, private toastr: ToastrService) {
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
  updateMember(){
    console.log(this.member)
    this.toastr.success('Profile updated successfully')
    this.editForm?.reset(this.member)
  }


   
}
  
  

