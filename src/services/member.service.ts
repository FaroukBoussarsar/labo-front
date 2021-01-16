import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";
import {MemberEtudiant,MemberEnseignant,Member} from "../models/memeber.model";
import { Tool } from 'src/models/tool.model';
import { Article } from 'src/models/article.model';
import { Event } from 'src/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  // public placeholderMembers: Member[] = GLOBAL._DB.ourmembers;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllEtd(): Promise<MemberEtudiant[]> {
   
    
     return this.httpClient.get<MemberEtudiant[]>('http://localhost:9999/membreservice//membres/etd').toPromise();
   // return new Promise(resolve => resolve(this.placeholderMembers));
  }
  getAllEns(): Promise<MemberEnseignant[]> {
    return this.httpClient.get<MemberEnseignant[]>('http://localhost:9999/membreservice/membres/ens').toPromise();
  // return new Promise(resolve => resolve(this.placeholderMembers));
 }


  getEtdById(id: string): Promise<MemberEtudiant> {
     return this.httpClient.get<MemberEtudiant>(`http://localhost:9999/membreservice/fullmember/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
    // ));
  }
  getEnsById(id: string): Promise<MemberEnseignant> {
    return this.httpClient.get<MemberEnseignant>(`http://localhost:9999/membreservice/fullmember/${id}`).toPromise();
   // return new Promise(resolve => resolve(
   //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
   // ));
 }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEtd(member: any): Promise<MemberEtudiant> {
    return this.httpClient.post<MemberEtudiant>('http://localhost:9999/membreservice/membres/etd', member).toPromise();
    // const memberToSave = {
    //   id: member.id ?? Utils.fakeNumber().toString(),
    //   createdDate: member.createdDate ?? new Date().toISOString(), ...member
    // };
    // this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    // return new Promise(resolve => resolve(memberToSave));
  }
  saveEns(member: any): Promise<MemberEnseignant> {
    return this.httpClient.post<MemberEnseignant>('http://localhost:9999/membreservice//membres/ens', member).toPromise();
    // const memberToSave = {
    //   id: member.id ?? Utils.fakeNumber().toString(),
    //   createdDate: member.createdDate ?? new Date().toISOString(), ...member
    // };
    // this.placeholderMembers = [memberToSave, ...this.placeholderMembers.filter(item => item.id !== member.id)];

    // return new Promise(resolve => resolve(memberToSave));
  }

  

  affecterEnsToEtd(idetd:string,idens:string): Promise<Member> {

    return this.httpClient.put<Member>(`http://localhost:9999/membreservice/membres/etudiant/${idetd}/${idens}`,{}).toPromise();
  }
  affecterOutil(idetd:string,idens:string): Promise<Member> {

    return this.httpClient.put<Member>(`http://localhost:9999/membreservice/membres/affecteroutils/${idetd}/${idens}`,{}).toPromise();
  }
  affecterEvt(idetd:string,idens:string): Promise<Member> {

    return this.httpClient.put<Member>(`http://localhost:9999/membreservice/membres/affecterevt/${idetd}/${idens}`,{}).toPromise();
  }
  affecterPub(idetd:string,idens :String): Promise<Member> {

    return this.httpClient.put<Member>(`http://localhost:9999/membreservice/membres/affecterpub/${idetd}/${idens}`,{}).toPromise();
  }

  removeMemberById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:9999/membreservice/membres/${id}`).toPromise();
    // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }
  findOutilsById(id: string): Promise<Tool[]> {
    return this.httpClient.get<Tool[]>(`http://localhost:9999/membreservice/outils/developpeur/${id}`).toPromise();
   // return new Promise(resolve => resolve(
   //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
   // ));
 }
 findEventById(id: string): Promise<Event[]> {
  return this.httpClient.get<Event[]>(`http://localhost:9999/membreservice/evenements/organisateur/${id}`).toPromise();
 // return new Promise(resolve => resolve(
 //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
 // ));
}
findArticleById(id: string): Promise<Article[]> {
  return this.httpClient.get<Article[]>(`http://localhost:9999/membreservice/publications/auteur/${id}`).toPromise();
 // return new Promise(resolve => resolve(
 //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
 // ));
}
deleteEncadranttoEtudiant(idetd:string): Promise<Member> {

  return this.httpClient.put<Member>(`http://localhost:9999/membreservice/membres/encadrant/delete/${idetd}`,{}).toPromise();
}

findOutilsdiifById(id: string): Promise<Tool[]> {
  return this.httpClient.get<Tool[]>(`http://localhost:9999/membreservice/outildiff/${id}`).toPromise();
 // return new Promise(resolve => resolve(
 //   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
 // ));
}
findEventdiifById(id: string): Promise<Event[]> {
return this.httpClient.get<Event[]>(`http://localhost:9999/membreservice/eventdiff/${id}`).toPromise();
// return new Promise(resolve => resolve(
//   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
// ));
}
findArticlediifById(id: string): Promise<Article[]> {
return this.httpClient.get<Article[]>(`http://localhost:9999/membreservice/publicationsdiff/${id}`).toPromise();
// return new Promise(resolve => resolve(
//   this.placeholderMembers.filter(item => item.id === id)[0] ?? null
// ));
}
removeTeacherById(id: string): Promise<Boolean> {
  return this.httpClient.delete<Boolean>(`http://localhost:9999/membreservice/membres/teacher/${id}`).toPromise();
 // this.placeholderMembers = this.placeholderMembers.filter(item => item.id !== id);
 // return new Promise(resolve => resolve());
}

}
