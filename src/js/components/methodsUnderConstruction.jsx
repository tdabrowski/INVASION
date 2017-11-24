///---------------------------------------------------------------------------
//Move Alien Universal
//moveAlienUniversal(this.state.alien3.x,this.state.alien3.y,this.changeAlien3State,this.resetAlien3,this.alien3IdSetInterval);
moveAlienUniversal = (positionAlienX,positionAlienY,changeAlien,reset,alienIntervalId) =>{
    if(positionAlienY < 10){
        this.showElement('',positionAlienX, positionAlienY);  //Hide ALIEN  <---- here is the problem
        changeAlien(); //INCREMENT ALIEN POSITION Y
        //colisionDetection
        this.colisionDetectionUniversal(positionAlienX, positionAlienY, reset, alienIntervalId);  //ALIEN2
        this.showElement('alien',positionAlienX, positionAlienY); //SHOW ALIEN
    }
    else if (positionAlienY === 10){
        this.showElement('',positionAlienX, positionAlienY);  //HIDE ALIEN
        changeAlien(); //INCREMENT ALIEN POSITION Y
    }
}

//Change Alien3 state - increment position 1
changeAlien3State = () =>{
    this.setState({
        alien3:{
            x: this.state.alien3.x,
            y: this.state.alien3.y + 1,
        }
    });
}

//------------------------------------------------------------------------------
