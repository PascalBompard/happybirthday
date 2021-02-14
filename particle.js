function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 2;
    this.hue = 280;
    this.sat = 30;

    this.prevPos = this.pos.copy();


    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);   
    }

    this.follow = function(vectors) {
        let x = floor(this.pos.x/scl);
        let y = floor(this.pos.y/scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyforce(force);
    }
    
    this.applyforce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        stroke(this.hue,this.sat,100,1);
        let adjustHue = .1; 
        let adjustSat = .01; 
        
        this.hue += adjustHue;
        this.sat += adjustSat;
        // if (this.hue > 340 || this.hue < 280 ) {
        //     adjustHue = adjustHue * -1
        // }
        
        // if (this.sat > 60 || this.sat < 30 ) {
        //     adjustSat = adjustSat * -1
        // }
        if (this.hue > 340) {
            this.hue = 2800;
        } 
        if (this.sat > 50) {
            this.sat = 40;
        } 
        // if (this.sat > 60) {
        //     toggleAdjust = -1;
        //     console.log("+60 toggleAdjust: " + toggleAdjust);
        // } 
        // if (this.sat < 30) {
        //     toggleAdjust = 1;
        //     console.log("+60 toggleAdjust: " + toggleAdjust);
        // }


        //point(this.pos.x, this.pos.y);
        line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
        this.updatePrev();
    }

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function () {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) { 
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) { 
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) { 
            this.pos.y = height;
            this.updatePrev();
        }

        
    }
}