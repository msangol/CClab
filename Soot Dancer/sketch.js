let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new MorphDancer(width / 2, height / 2, 35);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class MorphDancer {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.armLength = 20;
    this.armSpeed = 1;
    this.armAngle = 0;
    this.angle = 0;
    this.speed = 0.05;
    this.centerX = width / 2;
    this.centerY = height / 2;
    this.starRadius1 = 10;
    this.starRadius2 = 20;
    this.starNpoints = 5;
    this.starOffsetX = 0;
    this.starOffsetY = 0;
  }

  update() {
    // Move the arms up and down
    this.armAngle += this.armSpeed;
    if (this.armAngle > PI / 4 || this.armAngle < -PI / 4) {
      this.armSpeed *= -1;
    }

    // Move the dancer in a circular path
    this.x = this.centerX + cos(this.angle) * 25;
    this.y = this.centerY + sin(this.angle) * 100;
    this.angle += this.speed;

    // Update star position
    this.updateStar();
  }

  display() {
    // Arms
    strokeWeight(6);
    stroke(255);
    line(this.x - 20, this.y + this.radius / 2, this.x - 40 -     cos(this.armAngle) * this.armLength, this.y + this.radius / 2 + sin(this.armAngle) * this.armLength); // left arm
    line(this.x + 20, this.y + this.radius / 2, this.x + 40 + cos(this.armAngle) * this.armLength, this.y + this.radius / 2 + sin(this.armAngle) * this.armLength); // right arm
    
    strokeWeight(4);
    stroke(4);
    line(this.x - 20, this.y + this.radius / 2, this.x - 40 - cos(this.armAngle) * this.armLength, this.y + this.radius / 2 + sin(this.armAngle) * this.armLength); // left arm
    line(this.x + 20, this.y + this.radius / 2, this.x + 40 + cos(this.armAngle) * this.armLength, this.y + this.radius / 2 + sin(this.armAngle) * this.armLength); // right arm

    // Ball
    fill(0);
    stroke(255);
    strokeWeight(1);
    ellipse(this.x, this.y, this.radius * 2);

    // Eyes
    fill(255);
    noStroke();
    ellipse(this.x - 15, this.y - 5, 20); // left eye
    ellipse(this.x + 15, this.y - 5, 20); // right eye

    // Pupil
    fill(0);
    noStroke();
    ellipse(this.x - 10, this.y - 5, 5); // left pupil
    ellipse(this.x + 10, this.y - 5, 5); // right pupil

    // Display star
    this.displayStar();
  }

  updateStar() {
    this.starOffsetX = (this.x -60 - cos(this.armAngle) * this.armLength + this.x + 60 + cos(this.armAngle) * this.armLength) / 2.2;
    this.starOffsetY = (this.y + this.radius / 2 + sin(this.armAngle) * this.armLength + this.y + this.radius / 2 + sin(this.armAngle) * this.armLength) / 2;
  }

  displayStar() {
    fill(255, 255, 0); 
    noStroke();
    this.star(this.starOffsetX, this.starOffsetY, this.starRadius1, this.starRadius2, this.starNpoints); 
  }

  // Star
  star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}