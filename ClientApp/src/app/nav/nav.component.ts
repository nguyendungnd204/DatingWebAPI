import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { error } from 'console';
import { Observable } from 'rxjs';
import { User } from '../_models/_user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { response } from 'express';



@Component({
  selector: 'app-nav',
  imports:[NgIf, NgFor,FormsModule, CommonModule, ToastrModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone:true
})
export class NavComponent implements OnInit {
  model: any={};
  
  

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService ) {
    
  }

  ngOnInit(): void {
    
    
  }

  login() {
    this.accountService.login(this.model).subscribe(
       {
        next : response => this.router.navigateByUrl('/members'),
          
        error : error => this.toastr.error(error.error)
      }
    )
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  
}
