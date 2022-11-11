import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EightGameService {
  position: number;
  distance: number;
  count: number;
  move: number;
  movedisp: Array<number>;
  valid_movement: Array<number>;
  list: Array<string> = new Array<string>(5);

  constructor() {}
  public board = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', ''],
  ];

  obs = new BehaviorSubject<string[][]>([
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', ''],
  ]);

  insertList(element: string){
    for (let index = 0; index < 5; index++) {
      if (this.list[index] == element) {
        return
      }
    }

    this.list[4] = this.list[3];
    this.list[3] = this.list[2];
    this.list[2] = this.list[1];
    this.list[1] = this.list[0];
    this.list[0] = element;
  }

  cleanList(){
    this.list[0] = '';
    this.list[1] = '';
    this.list[2] = '';
    this.list[3] = '';
    this.list[4] = '';
  }

  public iter = 0;

  func() {
    console.table(this.board);
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
      // this.obs.next(this.board)
    }
    this.obs.next(this.board);
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
      this.board[2][2] == '9'
    )
      return true;
    else return false;
  }

  //Função que verifica os movimentos disponíveis
  availableMovement() {
    if (this.board[0][0] == '') {
      this.valid_movement.push(2);
      this.valid_movement.push(4);
    } else if (this.board[0][1] == '') {
      this.valid_movement.push(1);
      this.valid_movement.push(3);
      this.valid_movement.push(5);
    } else if (this.board[0][2] == '') {
      this.valid_movement.push(2);
      this.valid_movement.push(6);
    } else if (this.board[1][0] == '') {
      this.valid_movement.push(1);
      this.valid_movement.push(5);
      this.valid_movement.push(7);
    } else if (this.board[1][1] == '') {
      this.valid_movement.push(2);
      this.valid_movement.push(4);
      this.valid_movement.push(6);
      this.valid_movement.push(8);
    } else if (this.board[1][2] == '') {
      this.valid_movement.push(3);
      this.valid_movement.push(5);
      this.valid_movement.push(9);
    } else if (this.board[2][0] == '') {
      this.valid_movement.push(4);
      this.valid_movement.push(8);
    } else if (this.board[2][1] == '') {
      this.valid_movement.push(5);
      this.valid_movement.push(7);
      this.valid_movement.push(9);
    } else if (this.board[2][2] == '') {
      this.valid_movement.push(6);
      this.valid_movement.push(8);
    }
  }

  //Testes
  current_distance(): number {
    let soma: number;
    let position: number = 1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] != ''){
          soma += (this.board[i][j] - position) * (this.board[i][j] - position)
        } else {
          soma += (9 - position) * (9 - position);
        }
        position++;
      }      
    }
    return soma;
  }

  //Função para simular movimento
  movementSimulation(position: number) {
    this.distance = 0;
    switch (position) {
      case 1:
        if (this.board[0][1] == '') {
          this.board[0][1] = this.board[0][0];
          this.board[0][0] = '';
          this.distance = this.current_distance();
          this.board[0][0] = this.board[0][1];
          this.board[0][1] = '';
        } else if (this.board[1][0] == '') {
          this.board[1][0] = this.board[0][0];
          this.board[0][0] = '';
          this.distance = this.current_distance();
          this.board[0][0] = this.board[1][0];
          this.board[1][0] = '';
        }
        break;

      case 2:
        if (this.board[0][0] == '') {
          this.board[0][0] = this.board[0][1];
          this.board[0][1] = '';
          this.distance = this.current_distance();
          this.board[0][1] = this.board[0][0];
          this.board[0][0] = '';
        } else if (this.board[0][2] == '') {
          this.board[0][2] = this.board[0][1];
          this.board[0][1] = '';
          this.distance = this.current_distance();
          this.board[0][1] = this.board[0][2];
          this.board[0][2] = '';
        } else if (this.board[1][1] == '') {
          this.board[1][1] = this.board[0][1];
          this.board[0][1] = '';
          this.distance = this.current_distance();
          this.board[0][1] = this.board[1][1];
          this.board[1][1] = '';
        }
        break;

      case 3:
        if (this.board[0][1] == '') {
          this.board[0][1] = this.board[0][2];
          this.board[0][2] = '';
          this.distance = this.current_distance();
          this.board[0][2] = this.board[0][1];
          this.board[0][1] = '';
        } else if (this.board[1][2] == '') {
          this.board[1][2] = this.board[0][2];
          this.board[0][2] = '';
          this.distance = this.current_distance();
          this.board[0][2] = this.board[1][2];
          this.board[1][2] = '';
        }
        break;

      case 4:
        if (this.board[0][0] == '') {
          this.board[0][0] = this.board[1][0];
          this.board[1][0] = '';
          this.distance = this.current_distance();
          this.board[1][0] = this.board[0][0];
          this.board[0][0] = '';
        } else if (this.board[1][1] == '') {
          this.board[1][1] = this.board[1][0];
          this.board[1][0] = '';
          this.distance = this.current_distance();
          this.board[1][0] = this.board[1][1];
          this.board[1][1] = '';
        } else if (this.board[2][0] == '') {
          this.board[2][0] = this.board[1][0];
          this.board[1][0] = '';
          this.distance = this.current_distance();
          this.board[1][0] = this.board[2][0];
          this.board[2][0] = '';
        }
        break;

      case 5:
        if (this.board[0][1] == '') {
          this.board[0][1] = this.board[1][1];
          this.board[1][1] = '';
          this.distance = this.current_distance();
          this.board[1][1] = this.board[0][1];
          this.board[0][1] = '';
        } else if (this.board[1][0] == '') {
          this.board[1][0] = this.board[1][1];
          this.board[1][1] = '';
          this.distance = this.current_distance();
          this.board[1][1] = this.board[1][0];
          this.board[1][0] = '';
        } else if (this.board[1][2] == '') {
          this.board[1][2] = this.board[1][1];
          this.board[1][1] = '';
          this.distance = this.current_distance();
          this.board[1][1] = this.board[2][1];
          this.board[2][1] = '';
        } else if (this.board[2][1] == '') {
          this.board[2][1] = this.board[1][1];
          this.board[1][1] = '';
          this.distance = this.current_distance();
          this.board[1][1] = this.board[2][1];
          this.board[2][1] = '';
        }
        break;

      case 6:
        if (this.board[0][2] == '') {
          this.board[0][2] = this.board[1][2];
          this.board[1][2] = '';
          this.distance = this.current_distance();
          this.board[1][2] = this.board[0][2];
          this.board[0][2] = '';
        } else if (this.board[1][1] == '') {
          this.board[1][1] = this.board[1][2];
          this.board[1][2] = '';
          this.distance = this.current_distance();
          this.board[1][2] = this.board[1][1];
          this.board[1][1];
        } else if (this.board[2][2] == '') {
          this.board[2][2] = this.board[1][2];
          this.board[1][2] = '';
          this.distance = this.current_distance();
          this.board[1][2] = this.board[2][2];
          this.board[2][2] = '';
        }
        break;

      case 7:
        if (this.board[1][0] == '') {
          this.board[1][0] = this.board[2][0];
          this.board[2][0] = '';
          this.distance = this.current_distance();
          this.board[2][0] = this.board[1][0];
          this.board[1][0] = '';
        } else if (this.board[2][1] == '') {
          this.board[2][1] = this.board[2][0];
          this.board[2][0] = '';
          this.distance = this.current_distance();
          this.board[2][0] = this.board[2][1];
          this.board[2][1] = '';
        }
        break;

      case 8:
        if (this.board[1][1] == '') {
          this.board[1][1] = this.board[2][1];
          this.board[2][1] = '';
          this.distance = this.current_distance();
          this.board[2][1] = this.board[1][1];
          this.board[1][1] = '';
        } else if (this.board[2][0] == '') {
          this.board[2][0] = this.board[2][1];
          this.board[2][1] = '';
          this.distance = this.current_distance();
          this.board[2][1] = this.board[2][0];
          this.board[2][0] = '';
        } else if (this.board[2][2] == '') {
          this.board[2][2] = this.board[2][1];
          this.board[2][1] = '';
          this.distance = this.current_distance();
          this.board[2][1] = this.board[2][2];
          this.board[2][2] = '';
        }
        break;

      case 9:
        if (this.board[1][2] == '') {
          this.board[1][2] = this.board[2][2];
          this.board[2][2] = '';
          this.distance = this.current_distance();
          this.board[2][2] = this.board[1][2];
          this.board[1][2] = '';
        } else if (this.board[2][1] == '') {
          this.board[2][1] = this.board[2][2];
          this.board[2][2] = '';
          this.distance = this.current_distance();
          this.board[2][2] = this.board[2][1];
          this.board[2][1] = '';
        }
        break;

      default:
        'error';
        break;
    }
    return this.distance;
  }

  getAvailableMovement() {
    return this.valid_movement;
  }

  getValuePosition(position: number) {
    if (position == 1) return this.board[0][0];
    if (position == 2) return this.board[0][1];
    if (position == 3) return this.board[0][2];
    if (position == 4) return this.board[1][0];
    if (position == 5) return this.board[1][1];
    if (position == 6) return this.board[1][2];
    if (position == 7) return this.board[2][0];
    if (position == 8) return this.board[2][1];
    if (position == 9) return this.board[2][2];
    return -1;
  }

  clearMovementAvailable(movedisp: Array<number>): Array<number> {
    let value;
    for (let index = 0; index < movedisp.length; index++) {
      value = this.getValuePosition(movedisp[index]);
    }
    return movedisp;
  }

  //Heurística 1 – análise em um nível
  firstHeuristic() {
    while (this.correctChecker() == false) {
      this.availableMovement();
      this.movedisp = this.getAvailableMovement();
      this.movedisp = this.clearMovementAvailable(this.movedisp);
    }
  }

  cleanMoveDisp(){

  }

  /*private void Primheuristica(){
    int mov = 0;
    ArrayList<Integer> movdisp;
    double count=0;


    while(this.tabuleiro.verificaCorreto()==false){
        double d = 0;
        this.tabuleiro.getMovimentoDisponivel();
        movdisp = this.tabuleiro.getMovdisp();
        movdisp = this.limpaMovDisp(movdisp);
        tabAux = tabuleiro;
        int i = 0;
        double menor = 9999999;

        for(i = 0; i < movdisp.size();i++){
            d = tabuleiro.simulaMovimento(movdisp.get(i));
            if(d < menor){
                 menor = d;
                 mov = movdisp.get(i);
            }
        }
        //peça a ser movida está na variavel mov, agora é só realizar o movimento
        this.tabuleiro.realizaMovimento(mov);
        movdisp = null;
        count++;
    }
    this.mostra();
    JOptionPane.showMessageDialog(this, "movimentos realizados: " + count, "Quantidade de movimentos", JOptionPane.INFORMATION_MESSAGE);
  }*/
}
