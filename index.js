import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    render() {

        return (
            <button className="square" //style={this.props.partOfWin ? style : null}
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    };
}

class Board extends React.Component {

    renderSquare(i) {
        return <Square
            partOfWin={this.props.partOfWin}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} />;  //call handleClick in Game
    }

    ///////   ADD-ON   /////// Render entire row
    renderRow(i) {
        var squares = Array(3).fill(null); //The 3 squares in each row
        var x;
        for (x = i; x < i + 3; x++) {
            squares.push(this.renderSquare(x));
        }
        return squares;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderRow(0)}
                </div>
                <div className="board-row">
                    {this.renderRow(3)}
                </div>
                <div className="board-row">
                    {this.renderRow(6)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [{     //array of boards after every move
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,  //reflects the move displayed to the user now
            ascend: true
        };
    }

    handleClick(i) {
        //get history up until this click (including this click)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);  //board history up until the stepNumber
        const current = history[history.length - 1];   //current state of board
        const squares = current.squares.slice();    //copy contents of 'squares' array in Board state

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //set the square to either X or O
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //update history
        this.setState({
            history: history.concat([{
                squares,
                location: this.getLocation(i)   //adds a location to each board in 'history'
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    getLocation(i) {
        var locations = [
            [1, 1],
            [1, 2],
            [1, 3],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 1],
            [3, 2],
            [3, 3]
        ]
        return locations[i];
    }

    //*****ADD-ON***** get (col,row) of squares on board
    // getLocation(i) {
    //     var x;
    //     var col = 0;
    //     var row = 0;
    //     const locations = this.state.locations.slice();   //9 (col,row) coordinates

    //     for (x = 0; x < 9; x++) {
    //         locations[x] = [col,row];

    //         if (col <= 1) {
    //             col = col + 1;
    //         }
    //         else {
    //             col = 0;
    //             row = row + 1;
    //         }
    //     }
    //     return locations[i];
    // }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0, //set to true if 'step' is even
        });
    }

    ///////   ADD-ON   /////// return true if array has 0 null values
    isArrayFull(arr) {
        var length = arr.length
        for (var i = 0; i < length; i++) {
            if (null === arr[i]) {
                return false
            }
        }
        return true;
    }

    //reverse order of 'moves'
    orderSwitch(){
        this.setState({
            ascend : !this.state.ascend
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {  //map the move # to its corresponding board in history
            const desc = move ?
                'Go to move #' + move + ' @ (' + history[move].location + ')' :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {move === this.state.stepNumber ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {       ///// ADD-ON ///// Display winning coordinates
            status = 'Winner: ' + winner[0] + ' @ (' + this.getLocation(winner[1][0])
                + '), (' + this.getLocation(winner[1][1]) + '), (' + this.getLocation(winner[1][2]) + ')';
        }
        else if (this.isArrayFull(current.squares) && winner == null) {
            status = 'No Winner';
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        partOfWin={winner}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{this.state.ascend ? moves : moves.reverse()}</ol>
                    <button onClick={() => this.orderSwitch()}>
                        {"Switch Order"}
                    </button>
                </div>
                <div className="game-info">

                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]]; //return [winner letter, win locations]
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);