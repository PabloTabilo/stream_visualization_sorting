import { Rectangle } from "../Rectangle.js";
export class InsertionSort{
    constructor(arr){
        this.arr = [...arr]
        this.n = this.arr.length
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
    sort(){
        // O(n^2)
        for(let i = 1; i<this.n; i++){ // - O(n)
            let key = this.arr[i].getNumber() // need to sort - think is minimum
            let key_obj = this.clone(this.arr[i])
            let j = i-1
            this.saveAnimation_hijoDe(i,true,false)
            // where locate the element (key) when i think
            // that the while is a sorted array
            while(j>=0 && this.arr[j].getNumber()>key){ // O(n)
                this.arr[j+1] = this.arr[j]
                this.saveAnimation_hijoDe(j+1,false,true)
                j--;
            }
            this.arr[j+1] = key_obj
            //this.arr[j+1] = key
            this.saveAnimation_hijoDe(j+1,false,true)
        }
    }
}