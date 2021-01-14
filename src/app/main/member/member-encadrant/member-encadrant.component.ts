import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberEnseignant } from 'src/models/memeber.model';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-encadrant',
  templateUrl: './member-encadrant.component.html',
  styleUrls: ['./member-encadrant.component.scss']
})
export class MemberEncadrantComponent implements OnInit {
  displayedColumnsTeacher: string[] = ['id', 'cin', 'nom','prenom','date', 'cv','email','grade','etablissement', 'actions'];
  currentItemId: string;
  dataSourceEnseignant: MemberEnseignant[] = [];

  constructor(
    private router: Router,
    private memberService :MemberService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    this.fetchDataSource();
  }


  private fetchDataSource(): void {

    this.memberService.getAllEns().then(data => this.dataSourceEnseignant=data );

    
    
   

  }
  affecter(idteacher:any){
    this.memberService.affecterEnsToEtd(this.currentItemId,idteacher).then(()=>console.log('done')
    )
  }

}
