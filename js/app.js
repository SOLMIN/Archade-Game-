var counterX = 300;
var counterY = 480;

//Possible x and y pixel values
var possibleY = [55, 225, 310, 395];
var possibleX = [0, 100, 200, 300, 400, 500, 600];
var lives = 5;
var score = 0;
var hearts = 0;
var keys = 0;
var bonusPoint = 0;
var stars = 0;


var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
};

// Enemies our player must avoid
var EnemyReturn = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-return.png';
    //this.sprite = 'images/enemy-bug.png';
    this.x = +808;
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
EnemyReturn.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x - (dt * 600 * Math.random());

    //collision engine
    if (this.x - counterX < 70 && this.x - counterX > -20 && this.y === counterY) {
        counterX = 300;
        counterY = 480;
        lives = lives - 1;
        document.getElementById("lives").innerHTML = lives;
        if (lives === 0) {
            document.write("<h1>You Have No life Remaining. . .  GAME OVER !!! </h1><h2>Refresh to play again</h2>");
        }

    };
    //resets enemys at start after reaching end of board
    if (this.x < -100) {
        this.x = +808
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * 600 * Math.random());
    //collision engine
    if (this.x - counterX < 50 && this.x - counterX > -20 && this.y === counterY) {
        counterX = 300;
        counterY = 480;
        lives = lives - 1;
        document.getElementById("lives").innerHTML = lives;
        if (lives === 0) {
            document.write("<h1>You Have No life Remaining. . .  GAME OVER !!! </h1><h2>Refresh to play again</h2>");
        }
    };
    //resets enemys at start after reaching end of board
    if (this.x > 808) {
        this.x = -100
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
EnemyReturn.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = counterX;
    this.y = counterY;
};

Player.prototype.resetPosition = function() {
    counterX = 300;
    counterY = 480;
    return counterX, counterY;
}

Player.prototype.update = function(dt) {
    this.x = counterX;
    this.y = counterY;

    if (counterX === key.x && counterY === key.y) {
        this.foundKey();
    }

    if (counterX === star.x && counterY === star.y) {
        this.foundStar();
    }

    if (counterX === heart.x && counterY === heart.y) {
        this.foundHeart();
    }

    if (counterX === stone.x && counterY === stone.y) {
        this.foundStone();
    }

    if (counterX === bonus.x && counterY === bonus.y) {
        this.foundBonus();
    }


}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            //checks if player is off the map
            if (counterY === 55) {
                this.resetPosition();
            } else {
                counterY -= 85;
            }
            break;
        case 'down':
            if (counterY === 480) {
                this.resetPosition();
            } else {
                counterY += 85;
            }
            break;
        case 'left':
            if (counterX === 0) {
                this.resetPosition();
            } else {
                counterX -= 100;
            }
            break;
        case 'right':
            if (counterX === 600) {
                this.resetPosition();
            } else {
                counterX += 100;
            }

            break;
    }
}

var Star = function() {
    this.sprite = 'images/Star.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    starX = this.x;
    starY = this.y;
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.foundStar = function() {
    stars = stars + 1;
    score = score + 1;
    star.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    star.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numStars = document.getElementById("stars");
    var numScores = document.getElementById("score");
    numStars.innerHTML = stars;
    numScores.innerHTML = score;
    if (score === 100) {
        document.write("<h1>CONGRATULATIONS You Got 100 Score  You Win !!!</h1>");
    } else if (star === 25) {
        document.write("<h1>CONGRATULATIONS You Have 25 Stars You Win !!!  </h1>");
    }
};


var Key = function() {
    this.sprite = 'images/Key.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    keyX = this.x;
    keyY = this.y;
};

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.foundKey = function() {
    keys = keys + 1;
    score = score + 1;
    key.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    key.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numKeys = document.getElementById("keys");
    var numScores = document.getElementById("score");
    numScores.innerHTML = score;
    numKeys.innerHTML = keys;
    if (score === 100) {
        document.write("<h1>CONGRATULATIONS You Got 100 Score You Win !!!</h1>");
    } else if (keys === 25) {
        document.write("<h1>CONGRATULATIONS You Have 25 Keys You Win !!!  </h1>");
    }
}

var Heart = function() {
    this.sprite = 'images/Heart.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    heartX = this.x;
    heartY = this.y;
};

Heart.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.foundHeart = function() {
    lives = lives + 1;
    heart.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    heart.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numHearts = document.getElementById("lives");
    numHearts.innerHTML = lives;
    if (lives === 0) {
        document.write("<h1>You Have No life Remaining. . .  GAME OVER !!! </h1><h2>Refresh to play again</h2>");
    }
}



var Stone = function() {
    this.sprite = 'images/Rock.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    stoneX = this.x;
    stoneY = this.y;
};

Stone.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.foundStone = function() {
    counterX = 300;
    counterY = 480;
    lives = lives - 1;
    stone.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    stone.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numStones = document.getElementById("lives");
    numStones.innerHTML = lives;
    if (lives === 0) {
        document.write("<h1>You Have No life Remaining. . .  GAME OVER !!! </h1><h2>Refresh to play again</h2>");
    }
}

var Bonus = function() {
    this.sprite = 'images/Gem-Blue.png';
    this.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    bonusX = this.x;
    bonusY = this.y;
};

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.foundBonus = function() {
    bonusPoint = bonusPoint + 2;
    score = score + 2;
    bonus.x = possibleX[Math.floor(Math.random() * possibleX.length)];
    bonus.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    var numBonusPoint = document.getElementById("bonus");
    var numScores = document.getElementById("score");
    numBonusPoint.innerHTML = bonusPoint;
    numScores.innerHTML = score;
    if (score === 100) {
        document.write("<h1>CONGRATULATIONS You Got 100 Score You Win !!!  </h1>");
    } else if (bonusPoint === 50) {
        document.write("<h1>CONGRATULATIONS  You Got 50 Bonus Points You Win !!!  </h1>");
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy(), new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy(), new EnemyReturn(), new Enemy()];

var player = new Player();

var key = new Key();

var star = new Star();

var heart = new Heart();

var stone = new Stone();
var bonus = new Bonus();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});