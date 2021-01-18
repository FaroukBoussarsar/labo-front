import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Member } from 'src/models/memeber.model';
import { Tool } from 'src/models/tool.model';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tools-list',
  templateUrl: './tools-list.component.html',
  styleUrls: ['./tools-list.component.scss']
})
export class ToolsListComponent implements OnInit {
 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();
 type:string='SOURCE'
  searchInput:string=''
 displayedColumns: string[] = ['id',   'source','date','actions'];
 dataSource: Tool[] = [];

 constructor(
   private toolService :ToolService,
   private dialog: MatDialog,
 ) { }


 ngOnDestroy(): void {
   this._onDestroy.next();
   this._onDestroy.complete();
 }

 ngOnInit(): void {
   this.fetchDataSource();
 }
 emailUpdated(event) {

  this.searchInput=event.target.value
}
fetch(){
  this.search()
      
  
    }
clear(){
  this.searchInput=''
  this.fetchDataSource();
}

 private fetchDataSource(): void {
   this.toolService.getAllTools().then(data => this.dataSource = data);
 }
 search(){

  this.dataSource=[]
  if(this.type==='SOURCE'){
 
    this.toolService.getAllTools().then(data =>{
data.map(item=>{
  if(item.source.toLowerCase().includes(this.searchInput.toLowerCase())){
this.dataSource.push(item)
  }
})
    })
  }
  

  
}

 onRemoveAccount(id: any): void {
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     hasBackdrop: true,
     disableClose: false,
   });

   dialogRef.componentInstance.confirmButtonColor = 'warn';

   dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {

     if (isDeleteConfirmed) {
       this.toolService.removeToolById(id).then(() => this.fetchDataSource());
     }
   });
 }

}
