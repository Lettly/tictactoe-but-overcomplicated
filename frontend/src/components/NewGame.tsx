import React from 'react';
import Popup from 'reactjs-popup';
import './NewGame.css';

type MyProps = { gameId: string, onGameIdChange: React.Dispatch<React.SetStateAction<string>>, onBoardChange: React.Dispatch<React.SetStateAction<number[][]>> };
type MyState = { gameIdInput: string, openModal: boolean };

export default class extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = { gameIdInput: '', openModal: true };
    };
    render() {
        return (
            <>
                < button className="bg-blue-400 hover:bg-blue-500 text-slate-900 font-bold py-1 px-10 rounded" onClick={() => this.setState({ ...this.state, openModal: true })}>Start new game</button >
                < Popup modal nested open={this.state.openModal} closeOnDocumentClick={false} >
                    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 text-center">
                        <h1 className='text-4xl font-bold'>Tic Tac Toe</h1>
                        <br />
                        <p>Insert the code or leave empty to start a new game</p>
                        <br />
                        <input type="text" onChange={(e) => this.setState({ ...this.state, gameIdInput: e.currentTarget.value })} value={this.state.gameIdInput} className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.newGame}>
                            Start
                        </button>
                    </div>
                </Popup >
            </>
        );
    }

    newGame = async () => {
        console.log("New game");
        try {

            //If the input is not empty, get the board from the server
            if (this.state.gameIdInput !== '') {
                this.props.onGameIdChange(this.state.gameIdInput);
                let response = await fetch(`http://localhost:8000/getBoard?gameId=${this.state.gameIdInput}`, {
                    method: "GET",
                })

                const json = await response.json();
                this.props.onBoardChange(json.board);
            } else { //If the input is empty, create a new game
                let response = await fetch("http://localhost:8000/newGame", {
                    method: "GET",
                })

                const json = await response.json();
                this.props.onGameIdChange(json.id);
                this.props.onBoardChange([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
            }
            //Close the modal
            this.setState({ ...this.state, openModal: false })
        } catch (error) {
            alert("Error: " + error);
        }
    }
};

