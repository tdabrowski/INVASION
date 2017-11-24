import React from 'react';
import ReactDOM from 'react-dom';


//Start game component - first panel
class StartGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            control:false   //controls hidding or showing panel with game rules
        }
    }
    //Starts game method
    handleStart = () => {
        if(typeof this.props.start === 'function'){
            this.props.start();
        }
    }

    //Shows more info about game
    handleRules = () => {
        this.setState({
            control:!this.state.control
        });
    }

    render() {
        let element = '';
        if(this.state.control === false){
            element = <h3 className="startgame__other" onClick={this.handleRules}>Game Rules</h3>;
        } else {
            element =   <p className="startgame__rules" onClick={this.handleRules}>
                            Aliens have going to take control over your planet. You have to destory all
                            enemy space ships (120) to defend your homeland.
                            Remember... aliens can have shilds so sometimes single missle can't destroy them always
                            and you can miss hit the target ! If you want avoid collision with alien space ship force up speed to fly over.
                            <br/>This is outer space and this is war !
                            Artilery can take up to 15 missed
                            aliens ships. You have 5 Jetfighters to fight.
                            <br/><span>JetFighter is controlled by arrowkeys. Weapon is activated by spacebar !</span>
                            <br/><br/><strong>Be proud and good luck !</strong>
                        </p>;
        }
        return (
            <div className="startgame__container">
                <h1 className="startgame__header" >INVASION</h1>;
                <h2 className="startgame__run" onClick={this.handleStart}>Start Game</h2>;
                {element}
            </div>
        );
    }
}

export {StartGame}
