import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [CommonModule,FormsModule,HomeComponent],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.css'
})
export class ServerErrorComponent implements OnInit {
  error: any;
  constructor(private router: Router){
    const navigation: Navigation | null = this.router.getCurrentNavigation()
    this.error = navigation?.extras?.state?['error']:this.error
  }

  ngOnInit(): void {
      
  }

}