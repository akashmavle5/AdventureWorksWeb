import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBrepositoryService } from '../services/dbrepository.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-assembly-line',
  templateUrl: './assembly-line.component.html',
  styleUrls: ['./assembly-line.component.css']
})
export class AssemblyLineComponent implements OnInit {
  LocationID: string;
  AssemblyName: string;
  AssemblyLineGridColumns: any[] = [];
  AssemblyLineGridDataAdapter: any;
  private readonly BASE_URL = environment.API_ENDPOINT;

  constructor(private _ActivatedRoute: ActivatedRoute, private DB: DBrepositoryService) { }
  ngOnInit() {
    // this._ActivatedRoute.params.subscribe(p => { console.log(p); } );
    // this._ActivatedRoute.paramMap.subscribe(p => {
    //   this.LocationID = p.get('LocationID');
    //   console.log(this.LocationID);
    //  });
    this.LocationID = this._ActivatedRoute.snapshot.params.LocationID;
    this.AssemblyName = this._ActivatedRoute.snapshot.params.AssemblyName;
    this.CreateAssemblyLineGrid();
  }

  CreateAssemblyLineGrid(): void {
    this.AssemblyLineGridColumns =
      [
        { text: 'Work Order ID', dataField: 'WorkOrderID', width: 100, cellsalign: 'center' },
        { text: 'Product Name', dataField: 'ProductName', width: 200 },
        { text: 'Order Qty', dataField: 'OrderQty', width: 85, cellsalign: 'center' },
        { text: 'Current Stage', dataField: 'CurrentStage', width: 120 },
        { text: 'Assembly Area', dataField: 'AssemblyArea', width: 120 },
        { text: 'Resource Hrs', dataField: 'ActualResourceHrs', width: 110, cellsalign: 'center' },
        { text: 'Actual Cost', dataField: 'ActualCost', width: 100, cellsalign: 'center' },
        { text: 'Start Date', dataField: 'StartDate', width: 100, cellsalign: 'center' },
        { text: 'End Date', dataField: 'EndDate', width: 100, cellsalign: 'center' }
      ];

    const GridConfig: any = {
      datatype: 'json',
      datafields: [
        { name: 'WorkOrderID', type: 'int' },
        { name: 'ProductName', type: 'string' },
        { name: 'OrderQty', type: 'int' },
        { name: 'CurrentStage', type: 'string' },
        { name: 'AssemblyArea', type: 'string' },
        { name: 'ActualResourceHrs', type: 'float' },
        { name: 'ActualCost', type: 'float' },
        { name: 'StartDate', type: 'string' },
        { name: 'EndDate', type: 'string' },
      ],
      sortcolumn: 'WorkOrderID',
      sortdirection: 'asc',
      id: 'WorkOrderID',
      pagesize: 5,
      totalrecords: 'totalrecords',
      root: 'root',
      cache: false,
      url: this.BASE_URL + 'Production/GetAssemblyLineRecords/' + this.LocationID,
      beforeprocessing: function (data) {
        GridConfig.totalrecords  = data.totalrecords ;
      }
    };

    this.AssemblyLineGridDataAdapter = new jqx.dataAdapter(GridConfig, {
      loadError: function (xhr, status, error) {
      console.log(error);
      }
  });
  }
  AssemblyLineGridRenderGridRows(obj) {
    return obj.data;
  }
}
