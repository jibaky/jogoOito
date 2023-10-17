export class gameState{
    board: String[][];
    goal: boolean;
    distance: number;
    empty: number[];
    adj: number[][];
    prevState: gameState;
    nextState: gameState[];

    constructor(board: String[][], prevState: gameState, dist: number){
      this.board = JSON.parse(JSON.stringify(board));
      this.goal = this.correctChecker();
      this.prevState = prevState;
      this.nextState = []
      this.distance = dist;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
            this.empty = [i, j];
          }
        }
      }
      this.adj = this.getAdjPieces(this.empty[0],this.empty[1]);
    }
    private equalGrandpa(): boolean {
      let dad = this.prevState;
      if(dad == null) return false;
      if (
        this.board[0][0] == dad.board[0][0] &&
        this.board[0][1] == dad.board[0][1] &&
        this.board[0][2] == dad.board[0][2] &&
        this.board[1][0] == dad.board[1][0] &&
        this.board[1][1] == dad.board[1][1] &&
        this.board[1][2] == dad.board[1][2] &&
        this.board[2][0] == dad.board[2][0] &&
        this.board[2][1] == dad.board[2][1] &&
        this.board[2][2] == dad.board[2][2]
      ) return true;
      else return false;
    }
    private correctChecker(): boolean {
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
      ) return true;
      else return false;
    }

    addNextState(){
      for(let i = 0; i < this.adj.length; i++){
        // console.log('b')
        this.swap(this.empty,this.adj[i]);
        if(this.equalGrandpa()){
          this.swap(this.empty,this.adj[i]);
          continue;
        }
        this.nextState.push(new gameState(this.board, this, this.current_distance()))
        this.swap(this.empty,this.adj[i]);
      }
    }

    private getAdjPieces(i: number, j: number) {
      let arr = [];
      if (i - 1 >= 0) arr.push([i - 1, j]);
      if (j - 1 >= 0) arr.push([i, j - 1]);
      if (j + 1 <= 2) arr.push([i, j + 1]);
      if (i + 1 <= 2) arr.push([i + 1, j]);
      return arr;
    }

    private swap(pos1: number[], pos2: number[]) {
      let arr1 = this.board[pos1[0]],
        arr2 = this.board[pos2[0]];
      let aux = arr1[pos1[1]];
      arr1[pos1[1]] = arr2[pos2[1]];
      arr2[pos2[1]] = aux;
    }

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

  }
  