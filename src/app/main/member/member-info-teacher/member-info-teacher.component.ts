import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberEnseignant, MemberEtudiant } from 'src/models/memeber.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-info-teacher',
  templateUrl: './member-info-teacher.component.html',
  styleUrls: ['./member-info-teacher.component.scss']
})
export class MemberInfoTeacherComponent implements OnInit {
  currentItemId: string;
  enseignantItem: MemberEnseignant;
  etudiantItem: MemberEtudiant;
  fullMemmber: object;
  pubs: string[] = [ 'titre', 'type','dateApparition','lien', 'sourcePdf'];
outils:string[]=['date','source']
evenements:string[]=['title','date','lieu']
  pubdatasource:any[]



  constructor(
    private router: Router,
     private memberService :MemberService,   
    private activatedRoute: ActivatedRoute,) { 
      
      
    }

  ngOnInit(): void {
 
   
    
     this.fetchDataSource();
     this.testtt()
  }


  private fetchDataSource(): void {
    // this.memberService.getAllEtd().then(data => this.dataSourceEtudiant=data );
    // this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params);
    
    if (!!this.currentItemId) {
    this.memberService.getEnsById(this.currentItemId).then(item => {



      console.log(item);
   
   console.log(this.enseignantItem);
   
      this.enseignantItem = item;
    

      
     });
     
    } 
    

    
  }
  private testtt(): void {
    // this.memberService.getAllEtd().then(data => this.dataSourceEtudiant=data );
    // this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );
   console.log(this.etudiantItem,'lenna');
   

    
  }

}
