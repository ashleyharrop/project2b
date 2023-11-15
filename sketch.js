let kanye;
let kanyeImage;
let bullets;
let bulletImage;
let bulletFired = false;
let lastBulletFrame = 0; // Variable to store the frame count of the last bullet fired
let bulletDelay = 30;
let fallingSprites;
let fallingSpriteImages = [];


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

  // Player controls
  if (keyIsDown(LEFT_ARROW) && kanye.position.x > 25) {
    kanye.position.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) && kanye.position.x < width - 25) {
    kanye.position.x += 5;
  }

  if (keyIsDown(32) && frameCount - lastBulletFrame > bulletDelay) {
    shootBullet();
    lastBulletFrame = frameCount; // Update the frame count of the last bullet fired
  }

  // Move bullets
  bullets.forEach(bullet => {
    bullet.position.y -= 5;
    if (bullet.position.y < 0) {
      bullet.remove();
    }
  });

  if (frameCount % 60 === 0) { // Spawn every 60 frames (adjust as needed)
    spawnFallingSprite();
  }

  // Move falling sprites
  fallingSprites.forEach(fallingSprite => {
    fallingSprite.position.y += 3; // Adjust the speed of falling sprites
    if (fallingSprite.position.y > height) {
      fallingSprite.remove();
    }
  });

}


function shootBullet() {
  let bullet = createSprite(kanye.position.x, kanye.position.y - 20, 5, 15);
  bullet.addImage(bulletImage); // Set the loaded image for the bullet sprite
  bullet.scale = 0.07; // Adjust the scale if needed
  bullets.add(bullet);
}

function spawnFallingSprite() {
  let randomIndex = floor(random(fallingSpriteImages.length));
  let fallingSprite = createSprite(random(width), 0, 30, 30);
  fallingSprite.addImage(fallingSpriteImages[randomIndex]);
  fallingSprite.scale = 0.1;
  fallingSprites.add(fallingSprite);
}