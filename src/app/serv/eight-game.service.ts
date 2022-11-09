import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EightGameService {

  constructor() { }
  // public board = [["","2","3"],["4","5","6"],["7","8","1"]];
  // public board = [["1","","3"],["4","5","6"],["7","8","2"]];
  // public board = [["1","2",""],["4","5","6"],["7","8","3"]];
  // public board = [["1","2","3"],["","5","6"],["7","8","4"]];
  // public board = [["1","2","3"],["4","","6"],["7","8","5"]];
  // public board = [["1","2","3"],["4","5",""],["7","8","6"]];
  // public board = [["1","2","3"],["4","5","6"],["","8","7"]];
  // public board = [["1","2","3"],["4","5","6"],["7","","8"]];
  public board = [["1","2","3"],["4","5","6"],["7","8",""]];
  public iter = 0
  func(){
    console.log(this.board);
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
    }
  }
}
