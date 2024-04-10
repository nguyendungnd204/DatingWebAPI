import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,ToastrModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  @Output() cancelRegister: EventEmitter<boolean> = new EventEmitter<boolean>();


  model : any = {};

  constructor(private accountService:AccountService, private toastr: ToastrService){
    
  }

  ngOnInit(): void {
      
  }
  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}

