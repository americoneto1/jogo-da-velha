class TicTacToe {
  board = {
    initial: new Array(9).fill(''),
    current: [],
  }
  symbols = {
    options: ['O', 'X'],
    currentIndex: 0,
    getActual() {
      this.currentIndex = this.currentIndex === 0 ? 1 : 0;
      return this.options[this.currentIndex];
    }
  }
  winnerSequences = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  getWinnerSequence(board, symbol) {
    return this.winnerSequences.find((item) => {
      return (board[item[0]] === symbol && board[item[1]] === symbol && board[item[2]] === symbol);
    });
  }

  gameIsOver(board) {
    return !board.includes('');
  }

  play(event) {
    if (event.target.textContent) { return; }

    const index = event.target.dataset.index;
    const symbol = this.symbols.getActual();
    this.board.current = Object.assign([], this.board.current, {[index]: symbol});
    this.draw(this.board.current);

    const winnerSequence = this.getWinnerSequence(this.board.current, symbol);

    if (winnerSequence) {
      this.styleWinner(winnerSequence);
      this.reset();
    } else {
      if (this.gameIsOver(this.board.current)) {
        setTimeout(() => {
          this.toogleVelha(true);
          this.reset();
        }, 500);
      }
    }
  }

  toogleVelha(show) {
    const velha = document.querySelector('.velha');
    if (show) {
      velha.classList.remove('hidden');
    } else {
      velha.classList.add('hidden');
    }
  }

  styleWinner(winnerSequence) {
    const container = Array.from(document.querySelectorAll('.jogo > button'));
    container.filter((item) => {
      return (+item.dataset.index === winnerSequence[0] ||
        +item.dataset.index === winnerSequence[1] ||
        +item.dataset.index === winnerSequence[2]);
    }).forEach(item => {
      item.classList.add('winner');
    });
  }

  draw(board) {
    const container = document.querySelector('.jogo');
    container.innerHTML = '';

    board.forEach((item, index) => {
      const block = document.createElement('button');
      block.setAttribute('data-index', index);
      block.innerHTML = item;
      block.addEventListener('click', (event) => this.play(event));
      container.appendChild(block);
    }); 
  }

  reset() {
    setTimeout(() => {
      this.toogleVelha(false);
      this.start();
    }, 1000);
  }

  start() {
    this.symbols.currentIndex = 0;
    this.board.current = this.board.initial;
    this.draw(this.board.initial);
  }
}

new TicTacToe().start();