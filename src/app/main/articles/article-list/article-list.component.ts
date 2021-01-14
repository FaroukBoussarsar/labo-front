import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/@root/components/confirm-dialog/confirm-dialog.component';
import { Article } from 'src/models/article.model';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();

 displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'sourcePdf',  'actions'];
 dataSource: Article[] = [];

 constructor(
   private articleService :ArticleService,
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
   this.articleService.getAllArticles().then(data => this.dataSource = data);
 }

 onRemoveAccount(id: any): void {
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
     hasBackdrop: true,
     disableClose: false,
   });

   dialogRef.componentInstance.confirmButtonColor = 'warn';

   dialogRef.afterClosed().pipe(takeUntil(this._onDestroy)).subscribe(isDeleteConfirmed => {

     if (isDeleteConfirmed) {
       this.articleService.removeArticleById(id).then(() => this.fetchDataSource());
     }
   });
 }

}
