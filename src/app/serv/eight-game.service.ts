import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EightGameService {

  constructor() { }
  public board = [["1","2","3"],["4","5","6"],["7","8",""]];

  obs = new BehaviorSubject<string[][]>( [["1","2","3"],["4","5","6"],["7","8",""]]);

  public iter = 0

  func(){
    console.table(this.board);
  }
  private getAdjPieces(i: number, j:number){
    let arr = [];
    if(i-1>=0) arr.push([i-1,j])
    if(j-1>=0) arr.push([i,j-1])
    if(j+1<=2) arr.push([i,j+1])
    if(i+1<=2) arr.push([i+1,j])
    return arr;
  
  }
  private swap(pos1: number[], pos2: number[]){
    let arr1 = this.board[pos1[0]], arr2 = this.board[pos2[0]];
    let aux = arr1[pos1[1]];
    arr1[pos1[1]] = arr2[pos2[1]];
    arr2[pos2[1]] = aux;
  }
  shuffle(qtd: number){
    let adj: number[][] = [];
    let empty: number[] = [];
    for (let iteracoes = 0; iteracoes< qtd; iteracoes++){
      for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
          if (this.board[i][j] == ""){
            empty = [i,j]
            adj = this.getAdjPieces(i,j);
          }
        }
      }
      let mod = Math.floor(Math.random() * adj.length)
      this.swap(empty, adj[mod])
      // this.obs.next(this.board)
    }
    this.obs.next(this.board);
  }
}
