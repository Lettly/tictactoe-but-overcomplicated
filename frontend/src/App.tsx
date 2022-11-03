import React from 'react';
import NewGame from './components/NewGame';
import Symbol from './components/Symbol';
import './App.css';

function App() {
  let [board, setBoard] = React.useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  let [gameId, setGameId] = React.useState("");
  let [gameState, setGameState] = React.useState(0);

  const newMove = async (x: number, y: number) => {
    try {
      let response = await fetch("http://localhost:8000/newMove", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gameId: gameId,
          x: x,
          y: y
        })
      })

      if (response.status === 200) {
        const json = await response.json();
        setBoard(json.board);
        setGameState(json.state);
      } else {
        alert("Error: " + await response.text());
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  const getGameState = () => {
    switch (gameState) {
      case 0:
        if (gameId) {
          return "Game in progress: " + gameId;
        }
        break;
      case 1:
      case 2:
        return <>Player <Symbol symbol={gameState} /> wins</>;
      case 3:
        return "Draw";
      default:
        return "Unknown state";
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <NewGame gameId={gameId} onGameIdChange={setGameId} onBoardChange={setBoard} />
        {getGameState()}
        <hr />
        <br />
        <table>
          <tr>
            <td className='boardCell' onClick={(e: any) => newMove(0, 0)}><Symbol symbol={board[0][0]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(0, 1)}><Symbol symbol={board[0][1]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(0, 2)}><Symbol symbol={board[0][2]} /></td>
          </tr>
          <tr>
            <td className='boardCell' onClick={(e: any) => newMove(1, 0)}><Symbol symbol={board[1][0]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(1, 1)}><Symbol symbol={board[1][1]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(1, 2)}><Symbol symbol={board[1][2]} /></td>
          </tr>
          <tr>
            <td className='boardCell' onClick={(e: any) => newMove(2, 0)}><Symbol symbol={board[2][0]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(2, 1)}><Symbol symbol={board[2][1]} /></td>
            <td className='boardCell' onClick={(e: any) => newMove(2, 2)}><Symbol symbol={board[2][2]} /></td>
          </tr>
        </table>
      </header>
    </div>
  );

}

export default App;
