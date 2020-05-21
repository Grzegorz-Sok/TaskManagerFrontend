import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {HttpClient} from '@angular/common/http';
import {Task} from '../task';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }


  showEmployees() {
    this.httpClient.get(`http://localhost:8080/allEmployees`).subscribe(data => {
      console.log(data);
      this.employees = data;
    });
  }

  addEmployee(name: string, surname: string, role: string) {
    const employee = new Employee();
    employee.name = name;
    employee.surname = surname;
    employee.role = role;
    employee.task = new Task();
    this.httpClient.post('http://localhost:8080/addEmployee', employee).subscribe(info => console.log(info));
  }

  deleteEmployee(employeeId: string) {
    this.httpClient.delete(`http://localhost:8080/deleteEmployee/?id=${employeeId}`).subscribe(data => {
      console.log(data);
    });
  }
}
