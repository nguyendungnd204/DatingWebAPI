import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavComponent } from "./nav/nav.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AccountService } from './_services/account.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {TabsModule} from 'ngx-bootstrap/tabs'
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MembersService } from './_services/members.service';
import { MemberListComponent } from './members/member-list/member-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [FormsModule, NavComponent, RouterModule,CommonModule,HomeComponent, 
      HttpClientModule, ToastrModule, MatCardModule, MatButtonModule, 
      RouterOutlet,TabsModule, MemberEditComponent, ]
})

export class AppComponent implements OnInit {
  title = 'ClientApp';
 
  users: any;
  

  constructor( private accountService: AccountService,private toastr: ToastrService ) 
  {
    
  }
  
  ngOnInit(): void {
    
     this.setCurrentUser();
  }

  setCurrentUser() {
    const userString: string | null = localStorage.getItem('user');
  if (userString !== null) {
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  } else {
    this.accountService.setCurrentUser(null);
  }
  }

 
}
  