import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../task';
import {Employee} from '../employee';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any;
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  showTasks() {
    this.httpClient.get(`http://localhost:8080/allTasks`).subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  addTask(priority: number, description: string, deadline: Date, type: string, status: string) {
    const task = new Task();
    task.priority = priority;
    task.description = description;
    task.deadline = new Date(deadline);
    task.type = type;
    task.status = status;
    task.doers = null;
    task.meeting = null;
    this.httpClient.post('http://localhost:8080/addTask', task).subscribe(info => console.log(info));
  }

  assignTask(employeeId: number, taskId: number) {
    this.httpClient.get(`${this.baseUrl}/getTask/?id=${taskId}`)
      .subscribe(
        (data: any) => {
          const task = new Task();
          task.id = data.id;
          task.priority = data.priority;
          task.description = data.description;
          task.deadline = data.deadline;
          task.type = data.type;
          task.status = data.status;
          task.doers = data.doers;
          task.meeting = data.meeting;
          this.httpClient.put(`http://localhost:8080/assignTask/?id=${employeeId}`, task).subscribe(info => {
              console.log(info);
              this.httpClient.get(`${this.baseUrl}/getEmployee/?id=${employeeId}`)
                .subscribe(
                  (res: any) => {
                    if (res.task !== null) {
                      const employee = new Employee();
                      employee.id = res.id;
                      employee.name = res.name;
                      employee.surname = res.surname;
                      employee.role = res.role;
                      employee.task = res.task;
                      if ( employee.task.id == taskId) {
                        this.httpClient.put(`http://localhost:8080/addDoer/?id=${task.id}`, employee).subscribe(last =>
                          console.log(last));
                      }
                    }
                  }
                );
            }
          );
        }
      );
  }

  showUnfinished() {
    this.httpClient.get(`http://localhost:8080/allUnfinishedTasks`).subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  showSortedByDate() {
    this.httpClient.get(`http://localhost:8080/allSortedByDate`).subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  showSortedByPriority() {
    this.httpClient.get(`http://localhost:8080/allSortedByPriority`).subscribe(data => {
      console.log(data);
      this.tasks = data;
    });
  }

  deleteTask(taskId: string) {
    this.httpClient.delete(`http://localhost:8080/deleteTask/?id=${taskId}`).subscribe(data => {
      console.log(data);
    });
  }
}

