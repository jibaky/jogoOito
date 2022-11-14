import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { EightGameService } from 'src/app/serv/eight-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  constructor(public service: EightGameService) {}

  @ViewChild('boardElement') board: ElementRef;
  @ViewChild('p1') piece1: ElementRef;
  @ViewChild('p2') piece2: ElementRef;
  @ViewChild('p3') piece3: ElementRef;
  @ViewChild('p4') piece4: ElementRef;
  @ViewChild('p5') piece5: ElementRef;
  @ViewChild('p6') piece6: ElementRef;
  @ViewChild('p7') piece7: ElementRef;
  @ViewChild('p8') piece8: ElementRef;
  @ViewChild('p0') piece0: ElementRef;

  tileList: ElementRef[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tileList = [
      this.piece0,
      this.piece1,
      this.piece2,
      this.piece3,
      this.piece4,
      this.piece5,
      this.piece6,
      this.piece7,
      this.piece8,
    ];

    this.service.obs.subscribe((newBoard) => {
      this.updateTiles(newBoard);
    });
  }

  updateTiles(board: string[][]): void {
    const side = 90;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const currentPiece = board[i][j] == '' ? 0 : board[i][j];
        if (currentPiece == 0)
          this.tileList[currentPiece].nativeElement.style.visibility = 'hidden';
        this.tileList[currentPiece].nativeElement.style.top = side * i + 'px';
        this.tileList[currentPiece].nativeElement.style.left = side * j + 'px';
      }
    }
  }

}
