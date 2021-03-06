import { Component } from '@angular/core';
import * as GC from "@grapecity/spread-sheets";
import * as Excel from "@grapecity/spread-excelio";
import "@grapecity/spread-sheets-print";
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})

export class AppComponent {
  spreadBackColor= 'aliceblue';
  file;
  hostStyle = {
    width: '70vw',
    height: '100vh'
  };

  private spread: GC.Spread.Sheets.Workbook;
  
  private excelIO;

  constructor() {
    this.excelIO = new Excel.IO();
  }
 
 workbookInit(args){
  var spreadNS = GC.Spread.Sheets;
  const self = this;
  self.spread = args.spread;
 
 var sheet = self.spread.getActiveSheet();

 //define BindingPathCellType
function BindingPathCellType() {
  spreadNS.CellTypes.Text.call(this);
}
BindingPathCellType.prototype = new spreadNS.CellTypes.Text();
BindingPathCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
  if (value === null || value === undefined) {
    var sheet = context.sheet, row = context.row, col = context.col;
     if (sheet && (row === 0 || !!row) && (col === 0 || !!col)) {
        var bindingPath = sheet.getBindingPath(context.row, context.col);
          if (bindingPath) {
            value = "[" + bindingPath + "]";
          }
      }
  }
  spreadNS.CellTypes.Text.prototype.paint.apply(this, arguments);
};
//Generate two data source
function Company(name, logo, slogan, address, city, phone, email) {
  this.name = name;
  this.logo = logo;
  this.slogan = slogan;
  this.address = address;
  this.city = city;
  this.phone = phone;
  this.email = email;
}
function Customer(id, name, company) {
  this.id = id;
  this.name = name;
  this.company = company;
}
function Record(description, quantity, amount) {
  this.description = description;
  this.quantity = quantity;
  this.amount = amount;
}
function Invoice(company, number, date, customer, receiverCustomer, records) {
  this.company = company;
  this.number = number;
  this.date = date;
  this.customer = customer;
  this.receiverCustomer = receiverCustomer;
  this.records = records;
}
// Companys
var company1 = new Company("Baidu", null, "We know everything!", "Beijing 1st road", "Beijing", "010-12345678", "baidu@baidu.com"),
company2 = new Company("Tecent", null, "We have everything!", "Shenzhen 2st road", "Shenzhen", "0755-12345678", "tecent@qq.com"),
company3 = new Company("Alibaba", null, "We sale everything!", "Hangzhou 3rd road", "Hangzhou", "0571-12345678", "alibaba@alibaba.com"),
// Customers
customer1 = new Customer("A1", "employee 1", company2),
customer2 = new Customer("A2", "employee 2", company3),
// Records
records1 = [new Record("Finance charge on overdue balance at 1.5%", 1, 150), new Record("Invoice #100 for $1000 on 2014/1/1", 1, 150)],
records2 = [new Record("Purchase server device", 2, 15000), new Record("Company travel", 100, 1500), new Record("Company Dinner", 100, 200)],
// Invoices
invoice1 = new Invoice(company1, "00001", new Date(2014, 0, 1), customer1, customer1, records1),
invoice2 = new Invoice(company2, "00002", new Date(2014, 6, 6), customer2, customer2, records2),
// DataSources
dataSource1 = new spreadNS.Bindings.CellBindingSource(invoice1),
dataSource2 = new spreadNS.Bindings.CellBindingSource(invoice2);

 //Get sheet instance
self.spread.suspendPaint();
var sheet = self.spread.sheets[0];
sheet.name("FINANCE CHARGE");
//Set value or bindingPath and style
var bindingPathCellType = new BindingPathCellType();
sheet.getCell(1, 2).bindingPath("company.slogan").cellType(bindingPathCellType).vAlign(spreadNS.VerticalAlign.bottom);
sheet.getCell(1, 4).value("INVOICE").foreColor("#58B6C0").font("33px Arial");
sheet.getCell(3, 1).bindingPath("company.name").cellType(bindingPathCellType).foreColor("#58B6C0").font("bold 20px Arial");
sheet.getCell(5, 1).bindingPath("company.address").cellType(bindingPathCellType);
sheet.getCell(5, 3).value("INVOICE NO.").font("bold 15px Arial");
sheet.getCell(5, 4).bindingPath("number").cellType(bindingPathCellType);
sheet.getCell(6, 1).bindingPath("company.city").cellType(bindingPathCellType);
sheet.getCell(6, 3).value("DATE").font("bold 15px Arial");
sheet.getCell(6, 4).bindingPath("date").cellType(bindingPathCellType).formatter("MM/dd/yyyy").hAlign(spreadNS.HorizontalAlign.left);
sheet.getCell(7, 1).bindingPath("company.phone").cellType(bindingPathCellType);
sheet.getCell(7, 3).value("CUSTOMER ID").font("bold 15px Arial");
sheet.getCell(7, 4).bindingPath("customer.id").cellType(bindingPathCellType);
sheet.getCell(8, 1).bindingPath("company.email").cellType(bindingPathCellType);
sheet.getCell(10, 1).value("TO").font("bold 15px Arial");
sheet.getCell(10, 3).value("SHIP TO").font("bold 15px Arial");
sheet.getCell(11, 1).bindingPath("customer.name").cellType(bindingPathCellType).textIndent(10);
sheet.getCell(12, 1).bindingPath("customer.company.name").cellType(bindingPathCellType).textIndent(10);
sheet.getCell(13, 1).bindingPath("customer.company.address").cellType(bindingPathCellType).textIndent(10);
sheet.getCell(14, 1).bindingPath("customer.company.city").cellType(bindingPathCellType).textIndent(10);
sheet.getCell(15, 1).bindingPath("customer.company.phone").cellType(bindingPathCellType).textIndent(10);
sheet.getCell(11, 4).bindingPath("receiverCustomer.name").cellType(bindingPathCellType);
sheet.getCell(12, 4).bindingPath("receiverCustomer.company.name").cellType(bindingPathCellType);
sheet.getCell(13, 4).bindingPath("receiverCustomer.company.address").cellType(bindingPathCellType);
sheet.getCell(14, 4).bindingPath("receiverCustomer.company.city").cellType(bindingPathCellType);
sheet.getCell(15, 4).bindingPath("receiverCustomer.company.phone").cellType(bindingPathCellType);
sheet.addSpan(17, 1, 1, 2);
sheet.getCell(17, 1).value("JOB").foreColor("#58B6C0").font("bold 12px Arial");
sheet.addSpan(17, 3, 1, 2);
sheet.getCell(17, 3).value("PAYMENT TERMS").foreColor("#58B6C0").font("bold 12px Arial");
sheet.addSpan(18, 1, 1, 2);
sheet.getCell(18, 1).backColor("#DDF0F2");
sheet.addSpan(18, 3, 1, 2);
sheet.getCell(18, 3).value("Due on receipt").backColor("#DDF0F2").foreColor("#58B6C0").font("12px Arial");
sheet.getRange(17, 1, 2, 4).setBorder(new spreadNS.LineBorder("#58B6C0", spreadNS.LineStyle.thin), { top: true, bottom: true, innerHorizontal: true });
// Tables
var table = sheet.tables.add("tableRecordds", 20, 1, 4, 4, spreadNS.Tables.TableThemes.light6);
table.autoGenerateColumns(false);
// Table Columns
var tableColumn1 = new spreadNS.Tables.TableColumn();
tableColumn1.name("DESCRIPTION");
tableColumn1.dataField("description");

var tableColumn2 = new spreadNS.Tables.TableColumn();
tableColumn2.name("QUANTITY");
tableColumn2.dataField("quantity");

var tableColumn3 = new spreadNS.Tables.TableColumn();
tableColumn3.name("AMOUNT");
tableColumn3.dataField("amount");

// table bind columns
table.bindColumns([tableColumn1, tableColumn2, tableColumn3]);
table.bindingPath("records");
table.showFooter(true);
table.setColumnName(3, "TOTAL");
table.setColumnValue(2, "TOTAL DUE");
table.setColumnDataFormula(3, "=[@QUANTITY]*[@AMOUNT]");
table.setColumnFormula(3, "=SUBTOTAL(109,[TOTAL])");
sheet.getCell(26, 1).formula('="Make all checks payable to "&B4&". THANK YOU FOR YOUR BUSINESS!"').foreColor("gray").font("italic 14px Arial");
sheet.options.allowCellOverflow = true;
//Adjust row height and column width
sheet.setColumnWidth(0, 5);
sheet.setColumnWidth(1, 300);
sheet.setColumnWidth(2, 115);
sheet.setColumnWidth(3, 125);
sheet.setColumnWidth(4, 155);
sheet.setRowHeight(0, 5);
sheet.setRowHeight(1, 40);
sheet.setRowHeight(2, 10);
sheet.setRowHeight(3, 28);
sheet.setRowHeight(17, 0);
sheet.setRowHeight(18, 0);
sheet.setRowHeight(19, 0);
sheet.setRowHeight(25, 10);
sheet.options.gridline = { showHorizontalGridline: false, showVerticalGridline: false };

self.spread.resumePaint();
//Change data source
document.getElementById("changeDataSource").addEventListener('click',function () {
  var sheet = self.spread.getActiveSheet();
  if (sheet.getDataSource() === dataSource1) {
    sheet.setDataSource(dataSource2);
  } else {
      sheet.setDataSource(dataSource1);
  }
});
}
}