export interface Member {
  id: string,
  cin: string,
  nom: string,
  prenom:string,
  date: string,
  photo:string,
  cv: string,
  email:string,
  password:string,
  pubs:[],
  outils:[],
  evenements:[]
  
  dateInscription:string,
  diplome:string,
  
  encadrant:MemberEnseignant,
  
  grade:string,
  etablissement:string
}
export interface MemberEtudiant {
  id: string,
  cin: string,
  nom: string,
  prenom:string,
  date: string,
  photo:string,
  cv: string,
  email:string,
  password:string,
  pubs:[],
  outils:[],
  evenements:[],



  dateInscription:string,
  diplome:string,
  
  encadrant:MemberEnseignant



}
export interface MemberEnseignant {
  id: string,
  cin: string,
  nom: string,
  prenom:string,
  date: string,
  photo:string,
  cv: string,
  email:string,
  password:string,
  pubs:[],
  outils:[],
  evenements:[],



  grade:string,
  etablissement:string
  
  



}