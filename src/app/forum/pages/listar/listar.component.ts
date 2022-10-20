import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { PostInt } from 'src/app/shared/interface/post.interface';
import { ForumService } from '../../../shared/providers/forum.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  posts!: Observable<PostInt[]>;

  constructor(
    private _ps: ForumService,
  ) { }

  ngOnInit(): void {
    this.posts = this._ps.getPosts();
  }


}
