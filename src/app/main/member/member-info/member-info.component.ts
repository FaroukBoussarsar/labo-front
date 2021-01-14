import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import { MemberEnseignant, MemberEtudiant } from 'src/models/memeber.model';
import { MemberService } from 'src/services/member.service';
import {MatDialog} from "@angular/material/dialog";
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  protected _onDestroy = new Subject<void>();


  currentItemId: string;
  enseignantItem: MemberEnseignant;
  etudiantItem: MemberEtudiant;

  pubs: string[] = [ 'titre', 'type','dateApparition','lien', 'sourcePdf'];
outils:string[]=['date','source']
evenements:string[]=['title','date','lieu']




  constructor(
    private router: Router,
    private dialog: MatDialog,
     private memberService :MemberService,   
    private activatedRoute: ActivatedRoute,) { 
      
      
    }

  ngOnInit(): void {
 
   
    
     this.fetchDataSource();

  }
  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private fetchDataSource(): void {
    // this.memberService.getAllEtd().then(data => this.dataSourceEtudiant=data );
    // this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );
    this.currentItemId = this.activatedRoute.snapshot.params.id;

    if (!!this.currentItemId) {
    this.memberService.getEtdById(this.currentItemId).then(item => {

this.enseignantItem=item.encadrant

  
   

   
      this.etudiantItem = item;
    

      
     });
     
    } 
    

    
  }
  onRemoveAccount(id :any):void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {

      if (isDeleteConfirmed) {
        this.memberService.deleteEncadranttoEtudiant(id).then(() => this.fetchDataSource());
      }
    });
  }
  
}
