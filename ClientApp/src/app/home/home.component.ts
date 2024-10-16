import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from "../register/register.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from '../errors/not-found/not-found.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FormsModule,CommonModule, RegisterComponent, HttpClientModule, NotFoundComponent]
})
export class HomeComponent implements OnInit{

  registerMode = false;
  

  constructor(){}

  ngOnInit(): void {
      
  }

  registerToggle(){
    this.registerMode = !this.registerMode;

  }

  

  cancelRegisterMode(event : boolean)
  {
    this.registerMode = event;
  }

}
