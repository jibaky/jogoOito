import { Component, OnInit } from '@angular/core';
import { EightGameService } from 'src/app/serv/eight-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(public service: EightGameService) { }

  ngOnInit(): void {
  }

}
