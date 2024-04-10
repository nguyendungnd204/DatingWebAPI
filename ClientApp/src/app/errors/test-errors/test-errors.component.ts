import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { response } from 'express';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [CommonModule,HomeComponent],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css'
})
export class TestErrorsComponent implements OnInit {
  
  baseUrl= 'http://localhost:5231/api/';
  validationErrors: string[]=[]

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    
  }
  get404Error(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }
  get400Error(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }
  get500Error(){
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }
  get401Error(){
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response=> console.log(response),
      error: error => console.log(error)
    })
  }
  get400ValidationError(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: response=> console.log(response),
      error: (error) => {
        console.log(error)
        this.validationErrors = error
      }
      
    })
  }

}
