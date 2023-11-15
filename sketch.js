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


function preload() {
  kanyeImage = loadImage('assets/kanye.png');
  bulletImage = loadImage('assets/tomato.png');

  for (let i = 1; i <= 5; i++) {
    fallingSpriteImages.push(loadImage(`assets/taylor${i}.png`));
  }

}

function setup() {
  createCanvas(700,700);

  let title = createElement('h2', "TAYLOR VS KANYE");
  title.position(200,40);
  title.style('color', '#ff0000');

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