export class Rectangle{
    constructor(x, y, width, height, context, color, numero){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.color = color;
        this.selection_color = "#FFBA33";
        this.selection_is_sorted_color = "#EEF84D";
        // check state of the bar
        this.selection_bool = false;
        this.selection_is_sorted_bool = false;
        this.numero = numero;
        this.numero_str = numero.toString();
    }
    setX = (x) => this.x = x;
    getNumber = () => this.numero;
    getNumberStr = () => this.numero_str;
    setNumberStr = (n) => this.numero_str = n;
    resetSelection = () => {
        this.selection_bool = false;
        this.selection_is_sorted_bool = false;
    }
    setSelection = () => {
        if(this.selection_bool) this.selection_bool = false;
        else this.selection_bool = true;
        this.selection_is_sorted_bool = false;
    }
    setSelectionSorted = () => {
        if(this.selection_is_sorted_bool) this.selection_is_sorted_bool = false;
        else this.selection_is_sorted_bool = true;
        this.selection_bool = false
    }
    drawRectangle(){
        const borderWidth = 5;
        const offset = borderWidth * 2;
        this.context.beginPath();
        this.context.fillStyle = "black";
        this.context.fillRect(this.x - borderWidth, this.y - borderWidth, this.width+offset, this.height+offset);
        if(this.selection_bool) this.context.fillStyle = this.selection_color;
        else if(this.selection_is_sorted_bool) this.context.fillStyle = this.selection_is_sorted_color;
        else this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fill();
    }
}