
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create,  update: update });

function preload() {

    game.load.image('sky', 'assets/sky4.png');
    game.load.spritesheet('phaser', 'assets/phaser.png', 70, 90);
    game.load.spritesheet('zombie', 'img/zombie_sheet.png', 46, 49)
    game.load.spritesheet('laptop', 'assets/laptop.png', 70, 90);
    
}

var cursors;
var items = [];
var letters = [];
var zombie;
var laptop;

function create() {

    game.add.sprite(0, 0, 'sky');
    
    game.physics.arcade.gravity.y = 250;

    zombie = game.add.sprite(50, game.height - 40, 'zombie');
    zombie.animations.add('walk-right', [5,11,17]);

    laptop = game.add.sprite(game.width - 200, game.height - 55, 'laptop');
    game.physics.enable(laptop, Phaser.Physics.ARCADE);
    laptop.body.collideWorldBounds = true;
    
    game.physics.enable(zombie, Phaser.Physics.ARCADE);
    
    zombie.body.bounce.y = 0.2;
    zombie.body.collideWorldBounds = true;

    cursors = game.input.keyboard.createCursorKeys();

    letters = game.add.group();
    letters.enableBody = true;

//    letters.events.onOutOfBounds.add(zombieOut, this);


    for (var i = 0; i < 5; i++)
    {
        var item;
        item = game.add.sprite(190 + 69 * i, 55, 'phaser', i);
        item.anchor.setTo(0.5,0.5);
        letters.add(item);
        items.push(item);
    }
    
    letters.setAll('body.collideWorldBounds', true);

    animar();
}

function animar() {
  
    for (var i = 0; i < 5; i++) {
        var item = items[i];
        

        // Add a simple bounce tween to each character's position.
        var tween = game.add.tween(item).to({y: 570}, Math.floor((Math.random() * 6000) + 2000), Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, false);
        
        
        

        // Add another rotation tween to the same character.
        game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, false);
    }
}


function update() {
    
    zombie.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        zombie.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        zombie.body.velocity.x = 150;
        zombie.play('walk-right', 7, true); 
    }


    game.physics.arcade.overlap(letters, zombie, function(){
        console.log('gameOver');
        location.reload();
    });

    game.physics.arcade.overlap(zombie, laptop, win, null, this);

}

function win() {
    alert('Ganaste! ahora a laburar!');
}