import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EightGameService {

  arrLoop: number[][] = [];

  constructor() {}
  public board = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '']
  ];

  obs = new BehaviorSubject<string[][]>([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '']
  ]);

  // public board = [
  //   ['2', '4', '3'],
  //   ['5', '7', '6'],
  //   ['1', '8', ''] // controle
  // ];

  // obs = new BehaviorSubject<string[][]>([
  //   ['2', '4', '3'],
  //   ['5', '7', '6'],
  //   ['1', '8', ''] // controle
  // ]);

  public iter = 0;

  //retorna todas as peças a cima, baixo, esquerda e direita da peça passada como parametro
  //utilizado pra pegar quais peças podem ser trocadas com a peça fazia
  private getAdjPieces(i: number, j: number) {
    let arr = [];
    if (i - 1 >= 0) arr.push([i - 1, j]);
    if (j - 1 >= 0) arr.push([i, j - 1]);
    if (j + 1 <= 2) arr.push([i, j + 1]);
    if (i + 1 <= 2) arr.push([i + 1, j]);
    return arr;
  }
  //Função que troca a posição de duas peças
  private swap(pos1: number[], pos2: number[]) {
    let arr1 = this.board[pos1[0]],
      arr2 = this.board[pos2[0]];
    let aux = arr1[pos1[1]];
    arr1[pos1[1]] = arr2[pos2[1]];
    arr2[pos2[1]] = aux;
  }
  //Função de embaralhar tabuleiro
  shuffle(qtd: number) {
    let adj: number[][] = [];
    let empty: number[] = [];
    for (let iteracoes = 0; iteracoes < qtd; iteracoes++) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board[i][j] == '') {
            empty = [i, j];
            adj = this.getAdjPieces(i, j);
          }
        }
      }
      let mod = Math.floor(Math.random() * adj.length);
      this.swap(empty, adj[mod]);
      this.obs.next(this.board)
    }
  }

  //Função para verificar se as peças estão no lugar correto
  correctChecker(): boolean {
    if (
      this.board[0][0] == '1' &&
      this.board[0][1] == '2' &&
      this.board[0][2] == '3' &&
      this.board[1][0] == '4' &&
      this.board[1][1] == '5' &&
      this.board[1][2] == '6' &&
      this.board[2][0] == '7' &&
      this.board[2][1] == '8' &&
      this.board[2][2] == ''
    )
      return true;
    else return false;
  }

  //Verifica a distancia das peças de suas posições corretas
  current_distance(): number {
    let soma: number = 0;
    let position: number = 1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] != ''){
          soma += (position - Number(this.board[i][j])) * (position - Number(this.board[i][j]))
        } else {
          soma += (position - 9) * (position - 9);
        }
        position++;
      }      
    }
    return soma;
  }
  //Verifica se o proximo movimento terminará em loop
  isLoop(mod: number, piece: number[], print: boolean = false){
    if(this.arrLoop.length > mod-1 
      && this.arrLoop[this.arrLoop.length-mod][0] == piece[0] 
      && this.arrLoop[this.arrLoop.length-mod][1] == piece[1]){
      if(print) console.log("loop: " + mod);
      return true;
      }
    else return false;
  }
  //Função para simular movimento
  movementSimulatorLevelOne(){
    let distance = 9999999;
    let adj: number[][] = [];
    let empty: number[] = [];
    let final: number[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == '') {
          empty = [i, j];
          adj = this.getAdjPieces(i, j);
          if(this.arrLoop.length == 0)
            this.arrLoop.push(empty);
        }
      }
    }
    for(let i=0; i<adj.length; i++){
      if(this.isLoop(2, adj[i])) continue;
      else if(this.isLoop(4, adj[i])) continue;
      else if(this.isLoop(6, adj[i])) continue;
      else if(this.isLoop(8, adj[i])) continue;
      this.swap(empty, adj[i]);
      let dist = this.current_distance();
      if(dist<distance){
        distance = dist
        final = adj[i]
      this.swap(empty, adj[i]);
      }
    }
    this.arrLoop.push(final);
    if(this.arrLoop.length > 8) this.arrLoop.shift();
    return {empty:empty, final:final, distance:distance};
  }
  // Heuristica de análise em primeiro nível
  firstLevelHeuristics(){
    let i = 0;
    this.arrLoop = []
    while (!this.correctChecker()){
      i++;
      let move = this.movementSimulatorLevelOne()
      if(move.final.length == 0){
        // console.log("SHUFFLE")
        this.shuffle(1);
        continue;
      }
      this.swap(move.empty, move.final);
      // console.log("actual full on movement");
      this.obs.next(this.board);
    }
    // console.log("FIM");
    return i;
  }
  //Função para simular movimento pra heuristica 2
  movementSimulatorLower(){
    let distance = 9999999;
    let adj: number[][] = [];
    let empty: number[] = [];
    let final: number[] = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == '') {
          empty = [i, j];
          adj = this.getAdjPieces(i, j);
          if(this.arrLoop.length == 0)
            this.arrLoop.push(empty);
        }
      }
    }
    for(let i=0; i<adj.length; i++){

      if(this.isLoop(1, adj[i])) continue;
      else if(this.isLoop(3, adj[i])) continue;
      this.swap(empty, adj[i]);
      let dist = this.current_distance();
      if(dist<distance){
        distance = dist
        final = adj[i]
      }
      this.swap(empty, adj[i]);
    }
    return {empty:empty, final:final, distance:distance};
  }
  // Heuristica de análise em segundo nível
  movementSimulatorHigher(){
    let empty: number[] = [];
    let final: number[] = [];
    let distance = 9999999;
    let adj: number[][] = [];  
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (this.board[j][k] == '') {
          empty = [j, k];
          adj = this.getAdjPieces(j, k);
          if(this.arrLoop.length == 0)
            this.arrLoop.push(empty);
        }
      }
    }
    for(let j=0; j<adj.length; j++){
      if(this.isLoop(2, adj[j])) continue;
      this.swap(empty, adj[j]);
      const dist = this.current_distance()
      if(dist == 0){
        this.obs.next(this.board);
        return;
      }
      let move = this.movementSimulatorLower()
      if(move.final.length == 0){
        this.shuffle(1);
        continue;
      }
      if(move.distance < distance){
        distance = move.distance;
        final = move.empty;
      }
      this.swap(empty, adj[j]);
    }
    this.arrLoop.push(final);
    if(this.arrLoop.length > 8) this.arrLoop.shift();
    this.swap(empty, final);
    return
  }
  secondLevelHeuristics(){
    let i = 0;
    this.arrLoop = [];
    while(!this.correctChecker()){
      i++;
      this.movementSimulatorHigher();
      this.obs.next(this.board);
    }
    return i
  }
}
