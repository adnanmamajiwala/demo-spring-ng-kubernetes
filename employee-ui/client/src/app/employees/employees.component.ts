import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Address, Employee} from "./employees.model";
import {configuration} from "../app.configuration";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<Employee[]>(`${configuration.employees_url}`)
      .subscribe(value => {
        console.log("Response from service ", value);
        this.employees = value;
      })
  }

  getAddress(address: Address) {
    return address.street.concat(' ', address.state, ' ', address.country, ' ', address.zipCode);
  }

  getName(employee: Employee) {
    return employee.lastName.concat(', ', employee.firstName);
  }
}
