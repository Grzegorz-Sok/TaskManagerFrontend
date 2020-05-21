import { Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Employee} from './employee';
import {Task} from './task';
import {Meeting} from './meeting';
import {Observable} from 'rxjs';
import {concatMap, tap} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TaskManagerAngular';

  constructor(private httpClient: HttpClient) {}
}
