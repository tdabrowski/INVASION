import React from 'react';
import ReactDOM from 'react-dom';
import {StartGame} from './startGame.jsx';
import {Score} from './score.jsx';
import {MessageWindow} from './messageWindow.jsx';
import {EndGame} from './endGame.jsx';


class JetFighter{
    constructor(){
        this.x = 5;
        this.y = 10;
        this.direction = "up";
    }
}

class Alien{
    constructor(){
        this.x = Math.floor(Math.random() * 11);
        this.y = 0;
    }
}


//Main Game Engine Component
class GameBoard extends React.Component {
    /*GAME VERSION 1.0.1
    Title: INVASION
    TimeStamp: 2017-11-24
    Created by Tom Dabrowski
    Mail: tom.dabrowski@yahoo.com
    */
    constructor(props){
        super(props);
        this.state={
            startGame: false,
            countDownToEnd:5,       //player jet lives (substracted by one when hitted)
            missedAliens:0,         // if number of missed aliens will be greater than 10 player will lose game
            endGame: false,             // state of all game
            endMessage: '',         //Message on end game panel
            text: 'GET READY ! They are coming... ',       //text message for player from pilot
            counter: 200,   //key id start number for new elements
            board: [],          //board for the game (grid with divs)
            jet: new JetFighter(),    //jet fighter
            alien: new Alien(),         //first alien spaceship
            alien2: new Alien(),        //second alien spaceship
            alien3: new Alien(),        //third alien spaceship
            score: 0,                   //player score (+10 for fly one grid element and +100 for hitting alien)
            hitted: 0,              //hitted aliens by missle
            fire: false,   //spacebar - missle don't fired
        };
    }

    //Position index in board table
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



    //Move Jet missle up on the board
    moveMissle = (positionX,positionY) =>{
        let space = this;
        let misslePositionY = positionY;
        let misslePositionX = positionX;
        this.setState({
            fire:true
        });
        this.missleInterval = setInterval(()=>{
            if(space.checkIfEnemyHitted(misslePositionX,misslePositionY) === true){
                //space.showElement('',misslePositionX, misslePositionY);  //HIDE MISSLE
                space.setState({
                    fire:false
                });
                clearInterval(this.missleInterval);

            }
            else {
                space.showElement('',misslePositionX, misslePositionY);  //HIDE MISSLE
                misslePositionY = misslePositionY - 1;
                if(misslePositionY !== -1){
                    space.showElement('fireMissle',misslePositionX, misslePositionY);  //SHOW MISSLE
                }
                if(misslePositionY < 0){
                    space.setState({
                        text: 'RARGH ... ! Missle Mised !',
                        fire:false
                    });
                    clearInterval(this.missleInterval);
                    this.messageInterval = setTimeout(()=>{
                        this.setState({ text: ''});
                    },1500);
                }
            }
        },30);
    }

    //checking if enemy alien ship was hitted by missle
    checkIfEnemyHitted = (positionX,positionY) => {
        if(this.state.alien.x === positionX && this.state.alien.y === positionY){
            clearInterval(this.alienIdSetInterval);
            this.showElement('',this.state.alien.x, this.state.alien.y);  //HIDE ALIEN
            this.setState({
                score: this.state.score + 100,
                hitted: this.state.hitted + 1,
                alien: {
                    x:Math.floor(Math.random() * 11),
                    y:0
                },
                text: 'Yeah ..!!! Alien ship destroyed !'
            });
            this.winningGame();  //CHECK IF PLAYER WIN GAME
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);

            return true;
        }
        else if (this.state.alien2.x === positionX && this.state.alien2.y === positionY){
            clearInterval(this.alien2IdSetInterval);
            this.showElement('',this.state.alien2.x, this.state.alien2.y);  //HIDE ALIEN
            this.setState({
                score: this.state.score + 100,
                hitted: this.state.hitted + 1,
                alien2: {
                    x:Math.floor(Math.random() * 11),
                    y:0
                },
                text: 'Yeah ..!!! Alien ship destroyed !'
            });
            this.winningGame();  //CHECK IF PLAYER WIN GAME
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);

            return true;
        }
        else if (this.state.alien3.x === positionX && this.state.alien3.y === positionY){
            clearInterval(this.alien3IdSetInterval);
            this.showElement('',this.state.alien3.x, this.state.alien3.y);  //HIDE ALIEN
            this.setState({
                score: this.state.score + 100,
                hitted: this.state.hitted + 1,
                alien3: {
                    x:Math.floor(Math.random() * 11),
                    y:0
                },
                text: 'Yeah ..!!! Alien ship destroyed !'
            });
            this.winningGame();  //CHECK IF PLAYER WIN GAME
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);
            return true;
        }
        else {
            return false;
        }
    }


    //Move Alien1 down in the board
    moveAlien = () =>{
        if(this.state.alien.y < 10){
            this.showElement('',this.state.alien.x, this.state.alien.y);  //Hide ALIEN
            this.setState({
                alien:{
                    x: this.state.alien.x,
                    y: this.state.alien.y + 1,
                }
            });
            this.colisionDetectionUniversal(this.state.alien.x, this.state.alien.y, this.resetAlien, this.alienIdSetInterval);
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


    //Move Alien2 down in the board
    moveAlien2 = () =>{
        if(this.state.alien2.y < 10){
            this.showElement('',this.state.alien2.x, this.state.alien2.y);  //Hide ALIEN
            this.setState({
                alien2:{
                    x: this.state.alien2.x,
                    y: this.state.alien2.y + 1,
                }
            });
            //colisionDetection
            this.colisionDetectionUniversal(this.state.alien2.x, this.state.alien2.y, this.resetAlien2, this.alien2IdSetInterval);  //ALIEN2
            this.showElement('alien',this.state.alien2.x, this.state.alien2.y); //SHOW ALIEN
        }
        else if (this.state.alien2.y === 10){
            this.showElement('',this.state.alien2.x, this.state.alien2.y);  //HIDE ALIEN
            this.setState({
                alien2:{
                    x: this.state.alien2.x,
                    y: this.state.alien2.y + 1,
                }
            });
        }
    }





    //Move Alien2 down in the board
    moveAlien3 = () =>{
        if(this.state.alien3.y < 10){
            this.showElement('',this.state.alien3.x, this.state.alien3.y);  //Hide ALIEN
            this.setState({
                alien3:{
                    x: this.state.alien3.x,
                    y: this.state.alien3.y + 1,
                }
            });
            //colisionDetection
            this.colisionDetectionUniversal(this.state.alien3.x, this.state.alien3.y, this.resetAlien3, this.alien3IdSetInterval);  //ALIEN2
            this.showElement('alien',this.state.alien3.x, this.state.alien3.y); //SHOW ALIEN
        }
        else if (this.state.alien3.y === 10){
            this.showElement('',this.state.alien3.x, this.state.alien3.y);  //HIDE ALIEN
            this.setState({
                alien3:{
                    x: this.state.alien3.x,
                    y: this.state.alien3.y + 1,
                }
            });
        }
    }



    //STERING JET METHOD (KEYBOARD KEY MAPPING)
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
            case 32: //Fire button
                if(this.state.fire === false){
                    this.showElement('fireMissle',this.state.jet.x, this.state.jet.y-1); //SHOW MISSLE
                    this.moveMissle(this.state.jet.x, this.state.jet.y-1);
                    this.setState({
                        text: 'Firing Missle !'
                    });
                    this.messageInterval = setTimeout(()=>{
                        this.setState({ text: ''});
                    },1500);
                }
                break;
        }
    }



    //Universal collision Detection with space Ship
    //Colision detection with space ship
    //reset -- it is a reset position funciton for alien ship (y=random,x=0)
    //colisionDetectionUniversal(this.state.alien.x, this.state.alien.y, resetAlien, this.alienIdSetInterval)
    //Example:
    //this.colisionDetectionUniversal(this.state.alien.x, this.state.alien.y, this.resetAlien, this.alienIdSetInterval);   //ALIEN collision Detection
    //this.colisionDetectionUniversal(this.state.alien2.x, this.state.alien2.y, this.resetAlien2, this.alien2IdSetInterval);  //ALIEN2
    colisionDetectionUniversal = (positionAlienX,positionAlienY,reset,alienTimeId) => {
        //With Jet Figter
        if(this.state.jet.x === positionAlienX && this.state.jet.y === positionAlienY){
            let space = this;
            this.showElement('',this.state.jet.x, this.state.jet.y); //SHOW JET
            this.setState({
                countDownToEnd: this.state.countDownToEnd - 1,
                text: 'Damn ! We were hit, we were hit ! Hold on !',
                jet: {
                    x: 5,
                    y: 10
                },
                score: this.state.score + 100,
                hitted: this.state.hitted + 1,
            });
            this.winningGame();  //CHECK IF PLAYER WIN GAME
            reset(); //RESET ALIEN POSITION ON BOARD
            clearInterval(alienTimeId);
            this.showElement('',positionAlienX, positionAlienY);  //HIDE ALIEN
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);
            if(this.state.countDownToEnd === 0){
                clearInterval(this.alienIdSetInterval);
                clearInterval(this.alien2IdSetInterval);
                clearInterval(this.alien3IdSetInterval);
                clearInterval(this.startGameIntervalId);
                this.setState({
                    endMessage : 'JETFIGHTER WAS DESTROYED!',
                    endGame: true
                });
            }
        }
    }

    //reset Alien1 Position
    resetAlien = () => {
        this.setState({
            alien: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }

    //reset Alien2 Position
    resetAlien2 = () => {
        this.setState({
            alien2: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }

    //reset Alien3 Position
    resetAlien3 = () => {
        this.setState({
            alien3: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }


    //Set timer for Alien1 - starting Alien1 on board
    startAliens = () => {
        let gameSpace = this;
        this.alienIdSetInterval = setInterval(()=>{
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            gameSpace.moveAlien();
            if(this.state.alien.y >= 11){
                clearInterval(this.alienIdSetInterval);
            }
        },200);
        return true;
    }


    //Set timer for Alien2 - starting Alien2 on board
    startAlien2 = () => {
        let gameSpace = this;
        this.alien2IdSetInterval = setInterval(()=>{
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            gameSpace.moveAlien2();
            if(this.state.alien2.y === 11){
                clearInterval(this.alien2IdSetInterval);
            }
        },200);
        return true;
    }


    //Set timer for Alien3 - starting Alien3 on board
    startAlien3 = () => {
        let gameSpace = this;
        this.alien3IdSetInterval = setInterval(()=>{
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            gameSpace.moveAlien3();
            if(this.state.alien3.y === 11){
                clearInterval(this.alien3IdSetInterval);
            }
        },200);
        return true;
    }


    //END of GAME  first condition - player will lose game when missed aliens number will be greater or equal 10
    actualizeMissedAliens = () => {
        this.setState({
            missedAliens: this.state.missedAliens + 1
        });
        if(this.state.missedAliens >= 15){
            clearInterval(this.alienIdSetInterval);
            clearInterval(this.alien2IdSetInterval);
            clearInterval(this.alien3IdSetInterval);
            clearInterval(this.startGameIntervalId);
            this.setState({
                endMessage: 'YOU MISSED TOO MUCH ALIEN SHIPS. YOUR PLANET WILL BE DESTROYED !',
                endGame: true
            });
        }
    }


    //WINNING GAME CONDITION
    winningGame = () => {
        if (this.state.hitted >= 150){
            clearInterval(this.alienIdSetInterval);
            clearInterval(this.alien2IdSetInterval);
            clearInterval(this.alien3IdSetInterval);
            clearInterval(this.startGameIntervalId);
            this.setState({
                endMessage: 'GRATULATIONS ! YOU CAN BE PROUD YOU HAVE DEFENDED YOUR PLANET ! ALIENS WILL NOT COME BACK SOON !',
                endGame: true
            });
        }
    }




    //Move Alien missle down on the board
    //moveAlienMissle(this.state.alien.x,this.state.alien.y)
    moveAlienMissle = (positionX,positionY) =>{
        let spaceAlien = this;
        let missleAPositionY = positionY;
        let missleAPositionX = positionX;
        this.alienMissleInterval = setInterval(()=>{
            if(missleAPositionX === this.state.jet.x && missleAPositionY === this.state.jet.y) {
                this.showElement('',this.state.jet.x, this.state.jet.y);  //HIDE JET
                this.setState({
                    countDownToEnd: this.state.countDownToEnd - 1,
                    jet: {
                        x:5,
                        y:10
                    },
                    text: 'SHIT ! We were hit by missle ! You will not get me alive ! '
                });
                this.messageInterval = setTimeout(()=>{
                    this.setState({ text: ''});
                },1500);
                clearInterval(this.alienMissleInterval);
                //CHECK IF WE HAVE JETS TO FLY
                if(this.state.countDownToEnd === 0){
                    clearInterval(this.alienIdSetInterval);
                    clearInterval(this.alien2IdSetInterval);
                    clearInterval(this.alien3IdSetInterval);
                    clearInterval(this.startGameIntervalId);
                    this.setState({
                        endMessage : 'JETFIGHTER WAS DESTROYED!',
                        endGame: true
                    });
                }
            }
            else {
                if(missleAPositionY < 10){
                    spaceAlien.showElement('',missleAPositionX, missleAPositionY);  //HIDE MISSLE
                    missleAPositionY = missleAPositionY + 1;
                    spaceAlien.showElement('fireMissle',missleAPositionX, missleAPositionY);  //SHOW MISSLE
                }
                else if(missleAPositionY >= 10){
                    spaceAlien.showElement('',missleAPositionX, missleAPositionY);  //HIDE MISSLE
                    missleAPositionY = 0;
                    clearInterval(this.alienMissleInterval);
                }
            }
        },70);
    }



    componentDidMount(){
        //CHECKING IF PLAYER ACTIVATE GAME FROM START GAME PANEL
        this.manageInterval = setInterval(()=>{
            if(this.state.endGame !== true && this.state.startGame === true){
                //INITIAL BOARD WITH SPACE SHIPS and other settings
                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                //Activate Stering jetfighter
                document.addEventListener('keydown', (event) =>{
                    this.steringJet(event);
                });
                //------------------------------END INITIAL STATE----------------------------

                //START MOVING ALIENS SHIPS
                this.startGameIntervalId = setInterval(()=>{

                    if(this.startAliens()){ //FIRST ALIEN START AND ACTIVATE WEAPON
                        this.weaponTimeInterval = setTimeout(()=>{
                            this.moveAlienMissle(this.state.alien.x,this.state.alien.y+1);
                        },100);
                    }
                    this.timeIntervalAlien2 = setTimeout(()=>{  //SECOND ALIEN START
                        console.log('timer 2 start');
                        this.startAlien2();
                    },61000);
                    this.timeIntervalAlien3 = setTimeout(()=>{  //THIRD ALIEN START
                        console.log('timer 3 start');
                        this.startAlien3();
                    },122100); //121500

                    //ACTUALIZE JET FIGTER VIEW
                    this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET

                    //RESET MISSED ALLIENS
                    if(this.state.alien.y >= 11){
                        this.resetAlien();
                        this.actualizeMissedAliens();
                    }
                    if(this.state.alien2.y === 11){
                        this.resetAlien2();
                        this.actualizeMissedAliens();
                    }
                    if(this.state.alien3.y === 11){
                        this.resetAlien3();
                        this.actualizeMissedAliens();
                    }
                },3000);
                clearInterval(this.manageInterval);
            }

        },1000); //end of main interval
    }

    componentWillUnmount(){
        clearInterval(this.idSetInterval);
        clearInterval(this.alienIdSetInterval);
        clearInterval(this.alien2IdSetInterval);
        clearInterval(this.alien3IdSetInterval);
        clearInterval(this.startGameIntervalId);
        clearInterval(this.manageInterval);
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


    //Handle event on click from Component startGame
    handleStartGame = () => {
        this.setState({
            startGame: !this.state.startGame,
        });
    }

    render(){
        if(this.state.startGame === false){
            return <StartGame start={this.handleStartGame}/>
        }
        else if(this.state.endGame === false && this.state.startGame === true){
            return (
                <div>
                    <Score score={this.state.score} hitted={this.state.hitted} jets={this.state.countDownToEnd} missedAliens={this.state.missedAliens}/>
                    <section className="gameBoard__container">
                        {this.state.board}
                    </section>
                    <MessageWindow text={this.state.text}/>
                </div>
            );
        }
        else {
            return <EndGame score={this.state.score} hitted={this.state.hitted} endMessage={this.state.endMessage}/>
        }

    }
}



export {GameBoard}
