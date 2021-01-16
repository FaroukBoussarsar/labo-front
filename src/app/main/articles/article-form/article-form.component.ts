import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/article.model';
import { Member } from 'src/models/memeber.model';
import { ArticleService } from 'src/services/article.service';
import { MemberService } from 'src/services/member.service';
import { ArticleListComponent } from '../article-list/article-list.component';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {
  currentItemId: string;
  item: Article;
  form: FormGroup;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
  ) {
  }

  ngOnInit(): void {
    this.currentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.currentItemId) {
      this.articleService.getArticleById(this.currentItemId).then(item => {
        this.item = item;
        this.initForm(item)
      });
    } else {
      this.initForm(null);
    }
  }

  initForm(item: Article) {
    this.form = new FormGroup({

      type: new FormControl(item?.type, [Validators.required]),
      titre: new FormControl(item?.titre, [Validators.required]),
      lien: new FormControl(item?.lien, [Validators.required]),
      dateApparition: new FormControl(item?.dateApparition, [Validators.required]),
      sourcePdf: new FormControl(item?.sourcePdf, [Validators.required]),
    });
  }


  isFormInEditMode(): boolean {
    return !!this.currentItemId;
  }

  onSubmit(): void {
    const objectToSubmit: Member = {...this.item, ...this.form.value};

    this.articleService.saveArticle(objectToSubmit).then(() => this.router.navigate(['./articles']));

  }

}
