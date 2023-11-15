let kanye;
let kanyeImage;
let bullets;
let bulletImage;
let bulletFired = false;
let lastBulletFrame = 0; // Variable to store the frame count of the last bullet fired
let bulletDelay = 30;


function preload() {
  kanyeImage = loadImage('assets/kanye.png');
  bulletImage = loadImage('assets/tomato.png');
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

  // Create a group for bullets
  bullets = new Group();

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


}


function shootBullet() {
  let bullet = createSprite(kanye.position.x, kanye.position.y - 20, 5, 15);
  bullet.addImage(bulletImage); // Set the loaded image for the bullet sprite
  bullet.scale = 0.07; // Adjust the scale if needed
  bullets.add(bullet);
}
