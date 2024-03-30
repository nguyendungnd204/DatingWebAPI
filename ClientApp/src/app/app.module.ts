import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common'; // Import CommonModule
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
    declarations: [
       
    ],
    imports: [BrowserModule, HttpClientModule, BsDropdownModule.forRoot(),FormsModule,RouterModule,CommonModule,ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })],
    providers: [],
    bootstrap: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule{}


