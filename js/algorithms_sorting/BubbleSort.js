import { Rectangle } from "../Rectangle.js";
export class BubbleSort{
    constructor(arr){
        this.arr = [...arr];
        this.n = arr.length;
        this.animation_array = [[...arr]]
    }

    clone(obj) {
        return new Rectangle(obj.x,
            obj.y,
            obj.width,
            obj.height,
            obj.context,
            obj.color,
            obj.numero);
    }

    // O(n)
    saveAnimation_hijoDe(idx,selected,sorted){
        let local_arr = Array(this.n).fill(0)
        for(let w =0; w < this.n; w++) local_arr[w] = this.clone(this.arr[w])
        if(selected || sorted){
            if(selected) local_arr[idx].setSelection()
            else local_arr[idx].setSelectionSorted()
        }else{
            for(let i=0; i<this.n; i++) local_arr[i].resetSelection()
        }
        this.animation_array.push([...local_arr])
    }
    swap(i,j){
        //console.log("i:",i,"j:",j)
        let temp = [...this.arr][i] // ref
        this.arr[i] = this.arr[j]
        this.arr[j] = temp
        //console.log([...this.arr])
    }
    sort(){
        for(let i = 0; i < this.n - 1; i++){
            this.saveAnimation_hijoDe(i,true,false)
            for(let j = 0; j<this.n-i-1; j++){
                this.saveAnimation_hijoDe(j,true,false)
                this.saveAnimation_hijoDe(j+1,true,false)
                if(this.arr[j].getNumber() > this.arr[j+1].getNumber()){
                    this.swap(j,j+1);
                    this.saveAnimation_hijoDe(j,false,true)
                    this.saveAnimation_hijoDe(j+1,false,true)
                }
                this.saveAnimation_hijoDe(j,false,false)
                this.saveAnimation_hijoDe(j+1,false,false)
            }
            this.saveAnimation_hijoDe(i,false,true)
            this.saveAnimation_hijoDe(i,false,false)
        }
    }
}