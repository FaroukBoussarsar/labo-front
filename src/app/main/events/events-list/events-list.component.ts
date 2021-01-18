import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Event } from 'src/models/event.model';
import { EventService } from 'src/services/event.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();
 type:string=''
  searchInput:string=''
 displayedColumns: string[] = ['id', 'title', 'lieu', 'date', 'actions'];
 dataSource: Event[] = [];

 constructor(
   private eventService :EventService,
   private dialog: MatDialog,
 ) { }


 ngOnDestroy(): void {
   this._onDestroy.next();
   this._onDestroy.complete();
 }
 fetch(){
  this.search()
      
  
    }
 ngOnInit(): void {
   this.fetchDataSource();
 }
 emailUpdated(event) {

  this.searchInput=event.target.value
}
clear(){
  this.searchInput=''
    this.fetchDataSource();
}
 private fetchDataSource(): void {
   this.eventService.getAllEvents().then(data => this.dataSource = data);
 }
 search(){

  
  if(this.type==='LIEU'){

  this.dataSource=[]
this.eventService.getAllEvents().then(data=>{
  data.map(item=>{
    if(item.lieu.toLowerCase().toLowerCase().includes(this.searchInput.toLowerCase())){
      this.dataSource.push(item)
    }
  })
})

     

  }
  else if(this.type==='TITLE'){
   
    this.dataSource=[]
    this.eventService.getAllEvents().then(data=>{
      data.map(item=>{
        if(item.title.toLowerCase().toLowerCase().includes(this.searchInput.toLowerCase())){
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
       this.eventService.removeEventById(id).then(() => this.fetchDataSource());
     }
   });
 }
}
