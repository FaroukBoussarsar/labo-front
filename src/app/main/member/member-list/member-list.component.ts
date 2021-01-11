import {Component, OnDestroy, OnInit} from '@angular/core';
import {MemberService} from "../../../../services/member.service";
import {MemberEtudiant,MemberEnseignant} from "../../../../models/memeber.model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../@root/components/confirm-dialog/confirm-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  displayedColumnsStudent: string[] = ['id', 'cin', 'nom','prenom','date', 'cv','email','diplome','dateInscription', 'actions'];
 displayedColumnsTeacher: string[] = ['id', 'cin', 'nom','prenom','date', 'cv','email','grade','etablissement', 'actions'];
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
      // let array =data.filter(e=>e.etablissement==='STUDENT')
     
      // this.dataSourceStudent = array

      // let array2 =data.filter(e=>e.type==='TEACHER')

      // this.dataSourceTeacher = array2
//        data.map (e =>{
       
//         if ( e.etablissement  ){
//           console.log(e);
          
//             this.dataSourceTeacher.push(e)
//         }
//         else this.dataSourceStudent.push(e)
//     })

console.log(this.dataSourceEnseignant);
console.log(this.dataSourceEtudiant);
    
    
   

  }

  onRemoveAccount(id: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      disableClose: false,
    });

    dialogRef.componentInstance.confirmButtonColor = 'warn';

    dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {
      console.log('removing: ', isDeleteConfirmed);
      if (isDeleteConfirmed) {
        this.memberService.removeMemberById(id).then(() => this.fetchDataSource());
      }
    });
  }
}
