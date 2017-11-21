import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener('DOMContentLoaded', function(){

    class JetFighter{
        constructor(){
            this.x = 5;
            this.y = 10;
            this.direction = "right";
        }
    }

    class Alien{
        constructor(){
            //this.x = Math.floor(Math.random() * 10);
            //this.y = Math.floor(Math.random() * 10);
            this.x = Math.floor(Math.random() * 11);
            this.y = 0;
        }
    }


//Main Game Component
    class GameBoard extends React.Component {
        constructor(props){
            super(props);
            this.state={
                counter: 200,
                board: [],
                jet: new JetFighter(),
                alien: new Alien(),
                score: 0,
            };
        }

    index = (x,y) => {
        return x + (y * 11);
    }


    /*UNIVERSAL SHOW ELEMENT METHOD
    *
    //example for jetFighter,alien,missle and hide elements
    //showElement('jetFighter',this.state.jet.x, this.state.jet.y);    //SHOW JET
    //showElement('fireMissle',this.state.jet.x, this.state.jet.y-1);  //SHOW MISSLE
    //showElement('alien',this.state.alien.x, this.state.alien.y);   //SHOW ALIEN
    //showElement('',this.state.alien.x, this.state.alien.y);  //HIDE ALIEN
    //showElement('',this.state.jet.x, this.state.jet.y);  //HIDE JET
    */
    showElement = (nameClass,positionX,positionY) => {
        let updatedBoard = this.state.board.slice();
        let newElement = <div key={this.state.counter} className={nameClass}></div>;
        updatedBoard.splice(this.index(positionX, positionY),1,newElement);
        this.setState({
            board:updatedBoard,
            counter: this.state.counter + 1
        });
    }



    //Move Jet missle up on the board  --- under construction
    moveMissle = (positionX,positionY) =>{
        let space = this;
        let misslePositionY = positionY;
        let misslePositionX = positionX;
        console.log('ruszam pociskiem:');
        console.log(misslePositionX, misslePositionY);
        this.missleInterval = setInterval(()=>{
            space.showElement('',misslePositionX, misslePositionY);  //HIDE MISSLE
            misslePositionY = misslePositionY - 1;
            space.showElement('fireMissle',misslePositionX, misslePositionY);  //SHOW MISSLE
            console.log(misslePositionX, misslePositionY);
            if(misslePositionY === 0){
                clearInterval(this.missleInterval);
                console.log('killl missle in 0');
            }
            else if(misslePositionY < 0){
                clearInterval(this.missleInterval);
                console.log('killl missle in < 0');
            }


        },500);

    }



    //Move Alien down in the board
    moveAlien = () =>{
        if(this.state.alien.y < 10){
            this.showElement('',this.state.alien.x, this.state.alien.y);  //Hide ALIEN
            this.setState({
                alien:{
                    x: this.state.alien.x,
                    y: this.state.alien.y + 1,
                }
            });
            this.showElement('alien',this.state.alien.x, this.state.alien.y); //SHOW ALIEN
        }
        else if (this.state.alien.y === 10){
            this.showElement('',this.state.alien.x, this.state.alien.y);  //HIDE ALIEN
            this.setState({
                alien:{
                    x: this.state.alien.x,
                    y: this.state.alien.y + 1,
                }
            });
        }
    }


    steringJet = (event)=> {
        switch (event.which){
            case 37:    //Ster Left
                this.showElement('',this.state.jet.x, this.state.jet.y); //HIDE JET
                if(this.state.jet.x > 0){
                    this.setState({
                        jet:{
                            x: this.state.jet.x-1,
                            y: this.state.jet.y,
                            direction:"left"
                        }
                    });
                }
                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                break;
            case 39:    //Ster Right
                this.showElement('',this.state.jet.x, this.state.jet.y); //HIDE JET
                if(this.state.jet.x < 10){
                    this.setState({
                        jet:{
                            x: this.state.jet.x+1,
                            y: this.state.jet.y,
                            direction:"right"
                        }
                    });
                }
                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                break;
            case 38:    //Ster Up
                this.showElement('',this.state.jet.x, this.state.jet.y); //HIDE JET
                if(this.state.jet.y > 0){
                    this.setState({
                        jet:{
                            x: this.state.jet.x,
                            y: this.state.jet.y-1,
                            direction:"up"
                        }
                    });
                }
                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                break;
            case 40:    //Ster Down
                this.showElement('',this.state.jet.x, this.state.jet.y); //HIDE JET
                if(this.state.jet.y < 10){
                    this.setState({
                        jet:{
                            x: this.state.jet.x,
                            y: this.state.jet.y+1,
                            direction:"down"
                        }
                    });
                }
                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                break;
            //case 32: //Fire button
            //    this.showElement('fireMissle',this.state.jet.x, this.state.jet.y-1); //SHOW MISSLE
            //    this.moveMissle(this.state.jet.x, this.state.jet.y-1);
            //    break;
        }
    }


    fireMissleJet = (event)=> {
        switch (event.which){
            case 32: //Fire button
                this.showElement('fireMissle',this.state.jet.x, this.state.jet.y-1); //SHOW MISSLE
                this.moveMissle(this.state.jet.x, this.state.jet.y-1);
                break;
        }
    }


    startGame = () => {
        let gameSpace = this;
        this.idSetInterval = setInterval(()=>{
            gameSpace.moveAlien();
        },250);
    }



    componentDidMount(){
        //INITIAL BOARD WITH SPACE SHIPS
        this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
        //Waiting for state update and then we have another update
        this.timeoutId = setTimeout(()=>{
            this.showElement('alien',this.state.alien.x, this.state.alien.y);  //SHOW ALIEN
        },10);
        //------------------------------END INITIAL STATE----------------------------


        //START MOVING ALIEN SHIP
        this.startGame();

        //Stering jetfighter
        document.addEventListener('keydown', (event) =>{
            this.steringJet(event);
        });
        document.addEventListener('keydown', (event) =>{
            this.fireMissleJet(event);
        });
    }

    componentWillUnmount(){
        clearInterval(this.idSetInterval);
    }


    componentWillMount(){
        let boxs = [];
        for(let i=0; i < 121 ; i++){
        boxs.push(<div className='' key={i}></div>)
        }
        this.setState({
            board:boxs
        });
    }

    render(){
        return (
            <div>
              <Score score={this.state.score}/>
              <section id='board'>
                {this.state.board}
              </section>
              <Over/>
            </div>
        );
    }
  }



    class Score extends React.Component {
        render() {
            return (
                <section id='score'>
                  <div>
                    SCORE<br/>
                  <strong>{this.props.score}</strong>
                  </div>
                </section>
            );
        }
    }




    class Over extends React.Component {
        render() {
            return (
                <section id='over' className='invisible'>
                </section>
            );
        }
    }




    class App extends React.Component {
        render() {
            return (
                <GameBoard/>
            );
        }
    }


    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
