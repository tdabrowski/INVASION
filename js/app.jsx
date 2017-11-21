import React from 'react';
import ReactDOM from 'react-dom';


document.addEventListener('DOMContentLoaded', function(){

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


//Main Game Component
    class GameBoard extends React.Component {
        constructor(props){
            super(props);
            this.state={
                countDownToEnd:3,       //player jet lives (substracted by one when hitted)
                endGame: false,
                text: '',       //text message for player when hitted
                counter: 200,   //key id start number for new elements
                board: [],          //board for the game (grid with divs)
                jet: new JetFighter(),    //jet fighter
                alien: new Alien(),         //alien spaceship
                alien2: new Alien(),
                alien3: new Alien(),
                score: 0,                   //player score (+10 for fly one grid element and +100 for hitting alien)
                hitted: 0,              //hitted aliens by missle
                fire: false,   //spacebar - missle don't fired
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
        this.setState({
            fire:true
        });
        this.missleInterval = setInterval(()=>{
            if(space.checkIfEnemyHitted(misslePositionX,misslePositionY) === true){
                console.log('hitted when moving');
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
                        fire:false
                    });
                    clearInterval(this.missleInterval);
                }
            }
        },50);
    }


    checkIfEnemyHitted = (positionX,positionY) => {
        if(this.state.alien.x === positionX && this.state.alien.y === positionY){
            console.log('hitted by missle !');
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
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);

            return true;
        }
        else if (this.state.alien2.x === positionX && this.state.alien2.y === positionY){
            console.log('hitted by missle alien2 !');
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
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);

            return true;

        } else {
            return false;
        }
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
            //colisionDetection
            //this.colisionDetection();  //Colision Detection with Jet Fighter
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
            //this.colisionDetection();  //Colision Detection with Jet Fighter
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
                text: 'Damn ! We were hitted ! Hold on !',
                jet: {
                    x: 5,
                    y: 10
                },
                score: this.state.score + 100,
                hitted: this.state.hitted + 1,
            });
            reset(); //RESET ALIEN POSITION ON BOARD
            clearInterval(alienTimeId);
            this.showElement('',positionAlienX, positionAlienY);  //HIDE ALIEN
            this.messageInterval = setTimeout(()=>{
                this.setState({ text: ''});
            },1500);
            if(this.state.countDownToEnd === 0){
                console.log('End of game ! We were killed');
                clearInterval(this.alienIdSetInterval);
                clearInterval(this.alien2IdSetInterval);
                clearInterval(this.startGameIntervalId);
                this.setState({
                    endGame: true
                });
            }
        }
    }

    //reset Alien Position
    resetAlien = () => {
        this.setState({
            alien: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }

    //reset Alien Position
    resetAlien2 = () => {
        this.setState({
            alien2: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }

    //reset Alien Position
    resetAlien3 = () => {
        this.setState({
            alien3: {
                x:Math.floor(Math.random() * 11),
                y:0
            }
        });
    }



    startAliens = () => {
        let gameSpace = this;
        this.alienIdSetInterval = setInterval(()=>{
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            gameSpace.moveAlien();
            /*this.setState({
                score: this.state.score + 10
            });*/
            if(this.state.alien.y === 11){
                clearInterval(this.alienIdSetInterval);
            }
        },200);
    }


    startAlien2 = () => {
        let gameSpace = this;
        this.alien2IdSetInterval = setInterval(()=>{
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            gameSpace.moveAlien2();
            /*this.setState({
                score: this.state.score + 10
            });*/
            if(this.state.alien2.y === 11){
                clearInterval(this.alien2IdSetInterval);
            }
        },200);
    }



    componentDidMount(){
        if(this.state.endGame !== true){
            //INITIAL BOARD WITH SPACE SHIPS and other settings
            this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
            //Activate Stering jetfighter
            document.addEventListener('keydown', (event) =>{
                this.steringJet(event);
            });
            //------------------------------END INITIAL STATE----------------------------


            //START MOVING ALIEN SHIP
            this.startGameIntervalId = setInterval(()=>{
                this.startAliens();     //FIRST ALIEN START

                this.timeIntervalAlien2 = setTimeout(()=>{  //SECOND ALIEN START
                    this.startAlien2();
                },1000);
                //this.startAlien2();

                this.showElement('jetFighter',this.state.jet.x, this.state.jet.y); //SHOW JET
                if(this.state.alien.y === 11){
                    this.setState({
                        alien:{
                            x: Math.floor(Math.random() * 11),
                            y: 0,
                        }
                    });
                }
                if(this.state.alien2.y === 11){
                    this.resetAlien2();
                }
            },3000);






        }
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
        if(this.state.endGame === false){
            return (
                <div>
                  <Score score={this.state.score} hitted={this.state.hitted} jets={this.state.countDownToEnd}/>
                  <section id='board'>
                    {this.state.board}
                  </section>
                  <MessageWindow text={this.state.text}/>
                </div>
            );
        }
        else {
            return <EndGame score={this.state.score} hitted={this.state.hitted}/>
        }

    }
  }


    class MessageWindow extends React.Component{
        render(){
            const styles={
                display: 'flex',
                flexDirection: 'column',
                aligneItems: 'center',
                justifyContent: 'center',
                width: '704px',
                height: '40px',
                margin: '1em auto'
            }
            return (
                <div style={styles}>
                    <h2 style={{color:'white', textAlign:'center', display:'inline-block'}}>{this.props.text}</h2>
                </div>
            );
        }
    }


    class Score extends React.Component {
        render() {
            return (
                <section id='score'>
                  <div>
                    SCORE:
                    <strong>{this.props.score}</strong> <br/>
                    HITTED:
                    <strong>{this.props.hitted}</strong> <br/>
                    JETFIGHTERS:
                    <strong>{this.props.jets}</strong>
                  </div>
                </section>
            );
        }
    }





    class EndGame extends React.Component {
        render() {
            return (
                <div>
                    <h1 style={{color:'white', marginTop: '300px', textAlign:'center', fontSize:'46px'}}>Game over</h1>;
                    <h3 style={{color:'white',textAlign:'center'}}>JETFIGHTER WAS DESTROYED!</h3>
                    <h2 style={{color:'white',textAlign:'center'}}>SCORE: {this.props.score}</h2>
                    <h3 style={{color:'white',textAlign:'center'}}>DISTROYED SHIPS: {this.props.hitted}</h3>
                </div>
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
