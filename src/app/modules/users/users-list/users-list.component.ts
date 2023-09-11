import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{

  allusers:UserSchema[]=[]
  searchKey:string=""
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;

  constructor(private api:ApiService){}

  // when UserListComponent page is open call userDetails()
  ngOnInit(): void {
    this.userDetails()
  }

  // When users list page open, display all users list from json file by making an api call: http://localhost:3000/users
  userDetails(){
    this.api.userDetails().subscribe({
      next:(result:any)=>{
        console.log(result);
        this.allusers = result
      },
      error:(result:any)=>{
        console.log(result);
        alert("Cannot fetch the data Now... Please check after sometime!!!")
      }
    })
  }

  // removing an user
  deleteUser(id:any){
    this.api.deleteuser(id).subscribe({
      next:(res:any)=>{
        console.log("Deleted successfully");
        this.userDetails()
      },
      error:(err:any)=>{
        console.log(err);
        alert("Cannot fetch the data Now... Please check after sometime!!!")
      }
    })
  }

  // sort the data by name
  sortById(){
    this.allusers.sort((a:any,b:any)=>a.id-b.id)
  }

  sortByName(){
    this.allusers.sort((a:any,b:any) => a["name"].localeCompare(b["name"]) )
  }

  onTableDataChange(event: any){
    this.page = event;
    // this.userDetails();
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['User Id','User Name','Email','Status']]
    let body:any = []
    this.allusers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("All Employee List",10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("allUsers.pdf")
  }

}

// localeCompare = below code :
    // this.allusers.sort((a:any,b:any) => {

    //   let fa = a.name.toLowerCase()
    //   let fb = a.name.toLowerCase()
    //   if(fa<fb){
    //     return -1
    //   }
    //   if(fa>fb){
    //     return 1
    //   }
    //   return 0
    // })
    // console.log(this.allusers);
