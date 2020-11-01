

class User  {
    constructor(id, {x,y}, r,g,b){
      this.id = id
      this.pos = {x,y}
      this.r = r
      this.g = g
      this.b = b
    }
          render() {
            const posX = this.pos.x
            const posY = this.pos.y
            stroke(50);
            fill(this.r,this.g,this.b);
            ellipse(posX, posY, 24, 24);
           }

}