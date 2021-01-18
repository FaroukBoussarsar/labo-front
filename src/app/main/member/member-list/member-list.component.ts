import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../../../services/member.service";
import {MemberEtudiant,MemberEnseignant} from "../../../../models/memeber.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { MemberPopupComponent } from '../member-popup/member-popup.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  type:string=''
  searchInput:string=''
  displayedColumnsStudent: string[] = [ 'cin', 'nom','prenom','date', 'cv','email','diplome','dateInscription', 'actions'];
  displayedColumns: string[] = [ 'cin', 'nom','prenom','date', 'cv','email', 'actions'];
 displayedColumnsTeacher: string[] = [ 'cin', 'nom','prenom','date', 'cv','email','grade','etablissement', 'actions'];
  dataSourceEtudiant: MemberEtudiant[] = [];
  dataSourceEnseignant: MemberEnseignant[] = [];

  constructor(
    private memberService :MemberService,
    private dialog: MatDialog,
  ) { }


  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  ngOnInit(): void {
    this.fetchDataSource();
  }

  private fetchDataSource(): void {
    this.memberService.getAllEtd().then(data => this.dataSourceEtudiant=data );
    this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );

    
    
   

  }
  fetch(){
this.search()
    

  }
  emailUpdated(event) {
   
    this.searchInput=event.target.value
  }
  clear(){
    this.searchInput=''
    this.fetchDataSource();
  }

  search(){
   
    
    if(this.type==='CIN'){
    
       
          this.dataSourceEtudiant=[]
          this.dataSourceEnseignant=[]

          this.memberService.getAllEtd().then(data=>{
            data.map(item=>{
              if(item.cin.toLowerCase().includes(this.searchInput.toLowerCase())){
                this.dataSourceEtudiant.push(item)
              }
            })
          })

          this.memberService.getAllEns().then(data=>{
            data.map(item=>{
              if(item.cin.toLowerCase().includes(this.searchInput.toLowerCase())){
                this.dataSourceEnseignant.push(item)
              }
            })
          })

        
     

    }
    else if(this.type==='EMAIL'){
      this.dataSourceEtudiant=[]
      this.dataSourceEnseignant=[]

     
      this.memberService.getAllEtd().then(data=>{
        data.map(item=>{
          if(item.email.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEtudiant.push(item)
          }
        })
      })

      this.memberService.getAllEns().then(data=>{
        data.map(item=>{
          if(item.email.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEnseignant.push(item)
          }
        })
      })

     

    }
    else if(this.type==='FULLNAME'){
      this.dataSourceEtudiant=[]
      this.dataSourceEnseignant=[]

     
      this.memberService.getAllEtd().then(data=>{
        data.map(item=>{
          let str =item.nom+' '+item.prenom
          if(str.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEtudiant.push(item)
          }
        })
      })

      this.memberService.getAllEns().then(data=>{
        data.map(item=>{
          let str =item.nom+' '+item.prenom
          if(str.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEnseignant.push(item)
          }
        })
      })

     
      
    }
    else if(this.type==='DIPLOME'){
      this.dataSourceEtudiant=[]
      this.dataSourceEnseignant=[]

     
      this.memberService.getAllEtd().then(data=>{
        data.map(item=>{
          if(item.diplome.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEtudiant.push(item)
          }
        })
      })

     

      
    }
    else if(this.type==='GRADE'){
      this.dataSourceEtudiant=[]
      this.dataSourceEnseignant=[]

    

      this.memberService.getAllEns().then(data=>{
        data.map(item=>{
          if(item.grade.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEnseignant.push(item)
          }
        })
      })

      
    }
    else if(this.type==='ETABLISSEMENT'){
      this.dataSourceEtudiant=[]
      this.dataSourceEnseignant=[]

    
      this.memberService.getAllEns().then(data=>{
        data.map(item=>{
          if(item.etablissement.toLowerCase().includes(this.searchInput.toLowerCase())){
            this.dataSourceEnseignant.push(item)
          }
        })
      })

      
    }

    
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(MemberPopupComponent, {
     
       hasBackdrop: true,
      disableClose: false,
     
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {

      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });
  }

  onRemoveTeacherAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {

      if (isDeleteConfirmed) {
        this.memberService.removeTeacherById(id).then((item) => {console.log(item);
          if(item){
            this.openDialog()
          }
          else{
            this.fetchDataSource()
          }

        });
      }
    });
  }
}
