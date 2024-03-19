import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'ClientApp';
  usernameFocused: any;
users: any;
  constructor(private http: HttpClient){}
  
  ngOnInit():void{
    this.getUsers
  }
  getUsers(){
    this.http.get('http://localhost:5231/api/users').subscribe(response =>{
      this.usernameFocused = response;},
      error =>{
        console.log(error);
    })

  }

}
