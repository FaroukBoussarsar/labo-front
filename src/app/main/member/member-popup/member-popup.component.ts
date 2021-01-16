import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.scss']
})
export class MemberPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MemberPopupComponent>,
  ) {}
 
  ngOnInit(){
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
