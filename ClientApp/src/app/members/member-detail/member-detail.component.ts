import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs'

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule,HomeComponent,FormsModule,RouterModule,TabsModule, ],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {

 member : Member | undefined
 
  constructor( private memberService: MembersService, private route : ActivatedRoute) {
    
    
  }
  ngOnInit(): void {
    this.loadMember()

   
    

    }
    
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')!).subscribe(member => {
      this.member = member
      
    })
    
      
  }

}
