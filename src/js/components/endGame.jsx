import React from 'react';
import ReactDOM from 'react-dom';


//End game component with informations about player statistics when game ends
class EndGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control:false   //controls hidding or showing panel with additional informations
        }
    }

    //Shows more info about game
    handleAbout = () => {
        this.setState({
            control:!this.state.control
        });
    }
    render() {
        let element = '';
        if(this.state.control === false){
            element = <h3 className="endgame__about"  style={{color:'white'}} onClick={this.handleAbout}>About</h3>;
        } else {
            element =   <p className="endgame__about" style={{color:'white'}} onClick={this.handleAbout}>
                            Thank you for playing. Game inspired by Space Invaders Tomohiro Nishikado.
                            <br/><br/>Created by <strong>Tom Dabrowski</strong>
                        </p>;
        }
        return (
            <div className="endgame__container">
                <h1 className="endgame__header">Game over</h1>;
                <h3 className="endgame__endmessage">{this.props.endMessage}</h3>
                <h2 className="endgame__score">SCORE: {this.props.score}</h2>
                <h3 className="endgame__enemies">DISTROYED ENEMIES: {this.props.hitted}</h3>
                {element}
            </div>
        );
    }
}

export {EndGame}
