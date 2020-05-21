import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import {Meeting} from './meeting';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'meeting', component: MeetingListComponent },
  { path: 'task', component: TaskListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    TaskListComponent,
    MeetingListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
