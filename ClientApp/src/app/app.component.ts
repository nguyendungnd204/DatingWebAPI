import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from './_services/account.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from './home/home.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './_interceptors/loading.interceptor';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      HttpClientModule,
      ToastrModule,
      MatCardModule,
      MatButtonModule,
      TabsModule,
      BsDropdownModule,NavComponent,
      RouterModule,RouterLink,
      NgxSpinnerModule
    ]
})

export class AppComponent implements OnInit {
  title = 'ClientApp';
  users: any;

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

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
