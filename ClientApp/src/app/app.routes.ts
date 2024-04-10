import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

export const routes: Routes = [
    {path:'', component:HomeComponent },
    {
        path:'',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children:[
            {path:'members', component:MemberListComponent},
            {path:'members/:username', component:MemberDetailComponent },
            {path:'member/edit', component:MemberEditComponent },
            {path:'lists', component:ListComponent},
            {path:'messages', component: MessagesComponent },
            

        ]
    }, 
    {path:'errors', component:TestErrorsComponent},
    {path:'not-found', component:NotFoundComponent},
    {path:'server-error', component:ServerErrorComponent},
    {path:'**', component:HomeComponent, pathMatch: 'full' } 
];

