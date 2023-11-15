let kanye;
let kanyeImage;
let bullets;
let bulletImage;
let bulletFired = false;
let lastBulletFrame = 0; 
let bulletDelay = 30;
let fallingSprites;
let fallingSpriteImages = [];
let score = 0;
let lives = 3;
let button;
// let hitSound;


function preload() {
  kanyeImage = loadImage('assets/kanye.png');
  bulletImage = loadImage('assets/tomato.png');

  // hitSound = loadSound('assets/ah.mp3');

  for (let i = 1; i <= 5; i++) {
    fallingSpriteImages.push(loadImage(`assets/taylor${i}.png`));
  }

}

function setup() {
  createCanvas(700,700);

  button = createButton ("BACK")
  button.mouseClicked(buttonclicked);

  button.style('background-color', '#000000'); 
  button.style('color', '#FFFFFF'); 
  button.style('font-size', '15px');
  button.style('width', `60px`); 
  button.style('height', `45px`); 
  button.position(15,15);

  let title = createElement('h2', "TAYLOR VS KANYE");
  title.position(200,20);
  title.style('color', '#ff0000');

  // fill('#FFFFFF'); 
  // textSize(15);
  // textAlign(CENTER);
  // text("use <-- and --> to move", width / 2, height / 2 - 50);
  // text("press spacebar to shoot", width / 2, height / 2);

  kanye = createSprite(width / 2, height - 50, 50, 50);
  kanye.addImage(kanyeImage);
  kanye.scale = 0.2; 
  kanye.maxSpeed = 5;

 
  bullets = new Group();

  fallingSprites = new Group();

}

function draw() {
  background(0);


  if (keyIsDown(LEFT_ARROW) && kanye.position.x > 25) {
    kanye.position.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && kanye.position.x < width - 25) {
    kanye.position.x += 5;
  }

  if (keyIsDown(32) && frameCount - lastBulletFrame > bulletDelay) {
    shootBullet();
    lastBulletFrame = frameCount; 
  }

 
  bullets.forEach(bullet => {
    bullet.position.y -= 5;
    if (bullet.position.y < 0) {
      bullet.remove();
    }
  });

  if (frameCount % 60 === 0) { 
    spawnFallingSprite();
  }

  fallingSprites.forEach(fallingSprite => {
    if (
      kanye.position.x > fallingSprite.position.x - 15 &&
      kanye.position.x < fallingSprite.position.x + 15 &&
      kanye.position.y > fallingSprite.position.y - 15 &&
      kanye.position.y < fallingSprite.position.y + 15
    ) {
      fallingSprite.remove();
      lives--;
      // hitSound.play();
    }
  });


  fallingSprites.forEach(fallingSprite => {
    fallingSprite.position.y += 3; 
    if (fallingSprite.position.y > height) {
      fallingSprite.remove();
      
    }

  
  bullets.forEach(bullet => {
    if (bullet.position.x > fallingSprite.position.x - 15 &&
        bullet.position.x < fallingSprite.position.x + 15 &&
        bullet.position.y > fallingSprite.position.y - 15 &&
        bullet.position.y < fallingSprite.position.y + 15) {
      
      bullet.remove();
      fallingSprite.remove();
      score++;
        }
  });

});

fill(255);
textSize(20);
text(`Score: ${score}`, width - 150, 30);
text(`Lives: ${lives}`, width - 150, 60);

if (lives <= 0) {
  gameOver();
  noLoop();
}


}


function shootBullet() {
  let bullet = createSprite(kanye.position.x, kanye.position.y - 20, 5, 15);
  bullet.addImage(bulletImage); 
  bullet.scale = 0.07; 
  bullets.add(bullet);
}

function spawnFallingSprite() {
  let randomIndex = floor(random(fallingSpriteImages.length));
  let fallingSprite = createSprite(random(width), 0, 30, 30);
  fallingSprite.addImage(fallingSpriteImages[randomIndex]);
  fallingSprite.scale = 0.1;
  fallingSprites.add(fallingSprite);


}

function gameOver() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  textSize(20);
  text(`Your score: ${score}`, width / 2, height / 2 + 40);
}

function buttonclicked() {
  console.log("clicked start");
  location.href = "indexcopy.html";
}