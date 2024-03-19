import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path:'', component:HomeComponent
    },
    {
        path:'**', component:NotFoundComponent, 
        pathMatch:'full'
    },
    
     
];
