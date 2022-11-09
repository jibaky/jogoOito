import { Component, OnInit } from '@angular/core';
import { EightGameService } from 'src/app/serv/eight-game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public service: EightGameService) { }

  ngOnInit(): void {
  }
  func(){
    this.service.func();
  }
  shuffle(qtd: any){
    qtd = Math.round(Number(qtd));
    if(Number.isNaN(qtd)) return alert("introduza um numero no input")
    this.service.shuffle(qtd);
  }
}
