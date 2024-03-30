import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink,RouterOutlet,RouterModule, HttpClientModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit {
  constructor(private http: HttpClient){}
  ngOnInit(): void {
    
  }



}
