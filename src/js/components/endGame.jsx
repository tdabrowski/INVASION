import React from 'react';
import ReactDOM from 'react-dom';


//End game component with informations about player statistics when game ends
class EndGame extends React.Component {
    render() {
        return (
            <div className="endgame__container">
                <h1 className="endgame__header">Game over</h1>;
                <h3 className="endgame__endmessage">{this.props.endMessage}</h3>
                <h2 className="endgame__score">SCORE: {this.props.score}</h2>
                <h3 className="endgame__enemies">DISTROYED ENEMIES: {this.props.hitted}</h3>
            </div>
        );
    }
}

export {EndGame}
