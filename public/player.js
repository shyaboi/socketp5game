

class User  {
    constructor(id, {x,y}){
      this.id = id
      this.pos = {x,y}
    }
          render() {
            const posX = this.pos.x
            const posY = this.pos.y
            stroke(50);
            fill(100);
            ellipse(posX, posY, 24, 24);
           }

}