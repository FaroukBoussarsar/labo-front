import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberEnseignant, MemberEtudiant } from 'src/models/memeber.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  currentItemId: string;
  enseignantItem: MemberEnseignant;
  etudiantItem: MemberEtudiant;

  pubs: string[] = [ 'titre', 'type','dateApparition','lien', 'sourcePdf'];
outils:string[]=['date','source']
evenements:string[]=['title','date','lieu']




  constructor(
    private router: Router,
     private memberService :MemberService,   
    private activatedRoute: ActivatedRoute,) { 
      
      
    }

  ngOnInit(): void {
 
   
    
     this.fetchDataSource();

  }


  private fetchDataSource(): void {
    // this.memberService.getAllEtd().then(data => this.dataSourceEtudiant=data );
    // this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params);
    
    if (!!this.currentItemId) {
    this.memberService.getEtdById(this.currentItemId).then(item => {

this.enseignantItem=item.encadrant

      console.log(item.pubs);
   
   console.log(this.enseignantItem);
   
      this.etudiantItem = item;
    

      
     });
     
    } 
    

    
  }
 
}

