export class Rectangle{
    constructor(x, y, width, height, context, color, numero){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.color = color;
        this.numero = numero;
    }
    draw(){
        const borderWidth = 5;
        const offset = borderWidth * 2;
        this.context.beginPath();
        this.context.fillStyle = "black";
        this.context.fillRect(this.x - borderWidth, this.y - borderWidth, this.width+offset, this.height+offset);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fill();
    }
}