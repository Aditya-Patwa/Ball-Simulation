let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * .95;
canvas.height = window.innerHeight * .95;


class Ball {
    constructor(position, velocity, elasticity) {
        this.position = position;
        this.velocity = velocity;
        this.elasticity = elasticity;
        this.gravity = .981 / 2;
        this.friction = .05;
        this.radius = 20;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        // ctx.fillRect(this.position.x, this.position.y, 35, 35);
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        this.draw();
        if (this.velocity.x < 0) {
            this.velocity.x += this.friction;
        } else if (this.velocity.x > 0) {
            this.velocity.x -= this.friction;
        }
        this.position.x += this.velocity.x;


        
        this.checkHorizontalCollision();
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
        this.checkVerticalCollision();
    }

    checkHorizontalCollision() {
        if(checkCollisions(this)) {
            if (this.velocity.x < 0) {
                this.position.x = this.radius + 0.01;
                let angle = Math.atan(this.velocity.y/this.velocity.x) - Math.PI;
                this.velocity.x = this.velocity.x * Math.cos(angle);
                this.velocity.y = this.velocity.y * Math.sin(angle);
            } else if (this.velocity.x > 0) {
                let angle = Math.atan(this.velocity.y/this.velocity.x) + Math.PI;
                this.velocity.x = this.velocity.x * Math.cos(angle);
                this.velocity.y = this.velocity.y * Math.sin(angle);
                this.position.x = canvas.width - this.radius - 0.01;
            }
        }
    }

    checkVerticalCollision() {
        if(checkCollisions(this)) {
            if (this.velocity.y < 0) {
                this.velocity.y = 0;
                this.position.y = this.radius + 0.01;
            }
            if (this.velocity.y > 0) {
                this.velocity.y = -this.velocity.y * this.elasticity;
                // this.velocity.y = 0;
                this.position.y = canvas.height - this.radius - 0.01;
            }

            
            
        }
    }
}


function checkCollisions(ball) {
    return ((ball.position.x - ball.radius <= 0) || (ball.position.x + ball.radius >= canvas.width) || (ball.position.y - ball.radius <= 0) || (ball.position.y + ball.radius >= canvas.height));
}



let ball = new Ball({ x: canvas.width * .5, y: canvas.height * .5 }, { x: 0, y: 0 }, .9);

canvas.addEventListener("click", (e) => {
    let angle = Math.atan((e.offsetY-ball.position.y)/(e.offsetX-ball.position.x));
    if (angle<0) {
        ball.velocity.x = 15*Math.cos(angle);
        ball.velocity.y = 15*Math.sin(angle);
    } else {
        ball.velocity.x = -15*Math.cos(angle);
        ball.velocity.y = -15*Math.sin(angle);
    }
    console.log(angle);
});

function animate() {
    requestAnimationFrame(animate);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ball.update();
}


animate();