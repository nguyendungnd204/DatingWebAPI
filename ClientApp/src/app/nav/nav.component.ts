import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { User } from '../_models/user';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@Component({
  selector: 'app-nav',
  imports:[FormsModule, CommonModule, ToastrModule,RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  standalone:true
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => {
        this.router.navigateByUrl('/members');
        this.model = {}
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
