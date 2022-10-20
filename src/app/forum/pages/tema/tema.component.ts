import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostInt } from 'src/app/shared/interface/post.interface';
import { ForumService } from 'src/app/shared/providers/forum.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  elID: any;
  post!: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private _ps: ForumService,
    private router: Router
  ) {
    this.elID = this.activateRoute.snapshot.paramMap.get('id');
    console.log(this.elID);
  }

  ngOnInit(): void {
    this.getPost();
    console.log(this);
  }

  getPost() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if (!id) {
      return
    }
    return this._ps.getPostData(id)
      .subscribe(
        data => {
          console.log(data);
          this.post = data;
        }
      );
  }

}
