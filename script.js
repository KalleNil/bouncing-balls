const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

//ändrat om formen (graderna) för cirkeln (inte en cirkel längre).

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 );
  ctx.fill();
};


Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
  
};

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        //krockar en boll med en annan blir bollen med idex 0 större
        //har man lite tur med rng blir alla bollarna små tillslut
        balls[Math.floor(Math.random()*balls.length)].size = this.size = (random (1, 1));
        //tar bort bollen ifall den kolliderar med en annan boll
        balls.pop(balls[j]);
       
      }
    }
  }
};

let balls = [];

//fler bollar
while(balls.length < 200) {
  var size = random(10,30);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-799,722),
    random(-723,732),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
    
    
  );

  balls.push(ball);
}

Ball.prototype.biggerAndSmaller = function(){
  balls[i].size(random (10,30))
};

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();