import { Component, OnInit } from '@angular/core';
import { EightGameService } from 'src/app/serv/eight-game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public service: EightGameService) { }
  iteracoes: number = 0;

  ngOnInit(): void {
  }
  firstHeuristic(){
    this.iteracoes = this.service.firstLevelHeuristics()
  }
  secondHeuristic(){
    this.iteracoes = this.service.secondLevelHeuristics()
  }

  shuffle(qtd: any){
    qtd = Math.round(Number(qtd));
    if(Number.isNaN(qtd)) return alert("introduza um numero no input")
    if(qtd == 0) qtd = 1;
    for(let i = 0; i<qtd; i++){
      setTimeout(()=>{this.service.shuffle(1);}, i*80)
    }
  }

}
