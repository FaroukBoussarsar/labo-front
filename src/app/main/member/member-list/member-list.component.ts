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

  emailUpdated(event) {
    console.log("New email", event.target.value);
    this.searchInput=event.target.value
  }
  clear(){
    this.fetchDataSource()
  }

  search(){
    console.log(this.searchInput);
    
    if(this.type==='CIN'){
    
        this.memberService.findByCin(this.searchInput).then(data=>{
          this.dataSourceEtudiant=[]
          this.dataSourceEnseignant=[]
          if(data.diplome!==''&&!data.etablissement){
            this.dataSourceEtudiant.push(data)
            console.log(data);
            
          }
          if(data.etablissement){
            this.dataSourceEnseignant.push(data)
            console.log(data);
          }
        })

    }
    else if(this.type==='EMAIL'){

      this.memberService.findbyEmail(this.searchInput).then(data=>{
        this.dataSourceEtudiant=[]
        this.dataSourceEnseignant=[]
        if(data.diplome!==''&&!data.etablissement){
          this.dataSourceEtudiant.push(data)
          console.log(data);
          
        }
        if(data.etablissement){
          this.dataSourceEnseignant.push(data)
          console.log(data);
        }
      })

    }
    else if(this.type==='NAME'){
      this.memberService.findbyNom(this.searchInput).then(data =>{ 
        this.dataSourceEtudiant=[]
        this.dataSourceEnseignant=[]
data.map(item=>{this.displayedColumns=item
  if(item.diplome!==''&&!item.etablissement){
    this.dataSourceEtudiant.push(item)
    console.log(item);
    
  }
  if(item.etablissement){
    this.dataSourceEnseignant.push(item)
    console.log(item);
  }
})

    //    this.dataSourceEtudiant=data
      
      } );
     
      
    }
    else if(this.type==='DIPLOME'){

      this.memberService.findbydiplome(this.searchInput).then(data=>{
        this.dataSourceEtudiant=data
        this.dataSourceEnseignant=[]
        
      })
      
    }
    else if(this.type==='GRADE'){
      this.memberService.findByGrade(this.searchInput).then(data=>{
        this.dataSourceEtudiant=[]
        this.dataSourceEnseignant=data
        
      })
      
    }
    else if(this.type==='ETABLISSEMENT'){
      this.memberService.findByEtablissement(this.searchInput).then(data=>{
        this.dataSourceEtudiant=[]
        this.dataSourceEnseignant=data
        
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
