import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Member,MemberEtudiant,MemberEnseignant} from "../../../../models/memeber.model";


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  currentItemId: string;
  item: any;
  formStudent: FormGroup;
  formTeacher: FormGroup;
  form:FormGroup;
  type:any;
  url:any = '';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.memberService.getEtdById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
 
      this.initForm(null);
    }
  }

  initForm(item: any) {
    if(item===null){
      this.type='STUDENT'
    }
    else if( item.diplome){
      this.type='STUDENT'
    }
    else if(item.grade){
      this.type='TEACHER'
    }
    

    
    this.form = new FormGroup({

      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      date: new FormControl(item?.date, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
   
    }); 

    this.formTeacher = new FormGroup({


      grade: new FormControl(item?.grade, 
          [Validators.required]
          ), 
      etablissement: new FormControl(item?.etablissement,
        [Validators.required]
         ),

    });
  
    this.formStudent = new FormGroup({

   
 dateInscription: new FormControl(item?.dateInscription,
   [Validators.required]
  ),
      diplome: new FormControl(item?.diplome,
        [Validators.required]
        ),
    

    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
        
        
        
      }
    }
  }
  onSubmit(): void {
  //  const a = {...this.item,...this.form.value, ...this.formTeacher.value,...{photo:this.url}}
  //  console.log(a);
   
    if(this.type==='TEACHER'){
      const objectToSubmit: MemberEnseignant  = {...this.item,...this.form.value, ...this.formTeacher.value};

      this.memberService.saveEns(objectToSubmit).then(() => this.router.navigate(['./members']));
    }
    else if(this.type==='STUDENT'){
      const objectToSubmit:MemberEtudiant  = {...this.item, ...this.form.value, ...this.formStudent.value};

      this.memberService.saveEtd(objectToSubmit).then(() => this.router.navigate(['./members']));
    }
   

  }
}
