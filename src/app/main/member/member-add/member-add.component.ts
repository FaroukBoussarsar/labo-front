import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/models/article.model';
import { Event } from 'src/models/event.model';
import { Tool } from 'src/models/tool.model';
import { ArticleService } from 'src/services/article.service';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  
 EventColumns: string[] = ['id', 'title', 'lieu', 'date', 'actions'];
 ArticleColumns: string[] = ['id', 'type', 'titre', 'lien', 'sourcePdf',  'actions'];
 toolsColumns: string[]= ['id',   'source','date','actions'];
  currentItemId: string;
  event: Event[]=[]
  article: Article[]=[]
  tool: Tool[]=[]
  allTools: Tool[]=[]
  allEvent: Event[]=[]
  allArticle: Article[]=[]
  diffEvent:Event[]=[]

  constructor( private memberService :MemberService,
    private toolService :ToolService,
    private articleService :ArticleService,
    private eventService :EventService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.findInfo()

  }

  findInfo(){





    this.currentItemId = this.activatedRoute.snapshot.params.id;
    

    this.memberService.findEventdiifById(this.currentItemId).then(item=>{this.allEvent=item
      console.log(item,'first');
      })
      this.memberService.findArticlediifById(this.currentItemId).then(item=>{this.allArticle=item
        console.log(item,'first');
        })
        this.memberService.findOutilsdiifById(this.currentItemId).then(item=>{this.allTools=item
          console.log(item,'first');
          })


//     this.memberService.findEventById(this.currentItemId).then(item=>{this.event=item
//     console.log(item,'first');
//     })
  
//     this.eventService.getAllEvents().then(item=>{this.allEvent=item
      
      
    
//       })


//     this.memberService.findArticleById(this.currentItemId).then(item=>this.article=item)

//     this.memberService.findOutilsById(this.currentItemId).then(item=>this.tool=item)

//     this.toolService.getAllTools().then(item=>this.allTools=item)

//     this.articleService.getAllArticles().then(item=>this.allArticle=item)
// this.diffEvent=this.allEvent.filter(x => !this.event.includes(x));
// console.log(this.diffEvent,'result');

//   }
//    comparer(otherArray){
//     return function(current){
//       return otherArray.filter(function(other){
//         return other.value == current.value && other.display == current.display
//       }).length == 0;
//     }
  }

  onSubmitTools(id:any){
    this.memberService.affecterOutil(this.currentItemId,id).then((item)=>this.findInfo()
    )

  }
  onSubmitEvt(id:any){
    this.memberService.affecterEvt(this.currentItemId,id).then((item)=>this.findInfo()
    )

  }
  onSubmitArticle(id:any){
    this.memberService.affecterPub(this.currentItemId,id).then((item)=>this.findInfo()
    )

  }

}
