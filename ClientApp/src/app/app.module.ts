import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common'; // Import CommonModule

@NgModule({
    declarations: [],
    imports: [BrowserModule, HttpClientModule, NgFor],
    providers: [],
    bootstrap: []
})
export class AppModule{}


