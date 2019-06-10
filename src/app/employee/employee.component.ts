import { Component, OnInit } from '@angular/core';
import { DbrepositoryService } from '../services/dbrepository.service';
import { IEmployee } from '../viewmodel/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

   EmpList: Array<IEmployee> = [];
   IDTxtEmployeeIDSearch: Number;

  constructor(private DB: DbrepositoryService) { }

  OnBtnSearchClick(empid: Number) {
    this.DB.GetEmployeeDetailsFromServer(empid)
      .subscribe(resp => {
        if (resp.length > 0) {
          this.EmpList = resp;
        }
      },
        error => {
          console.log(error);
        });
  }
}
