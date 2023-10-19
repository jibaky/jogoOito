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
  nodes: number = 0;

  ngOnInit(): void {
  }
  random(){
    this.iteracoes = this.service.random()
  }
  firstHeuristic(){
    this.iteracoes = this.service.firstLevelHeuristics()
  }
  secondHeuristic(){
    this.iteracoes = this.service.secondLevelHeuristics()
  }

  lenSearch(qtd: any){
    qtd = Math.round(Number(qtd));
    if(Number.isNaN(qtd)) return alert("introduza um numero no input")
    let result = this.service.lengthSearch(qtd);
    this.iteracoes = result.iterations;
    this.nodes = result.nodes;
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
