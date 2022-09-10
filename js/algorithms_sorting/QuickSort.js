// time complexity
// A nivel medio -> O(n log n) - pivot ~ median
// worst case O(n^2)

// Space complexity
// swap
import { Rectangle } from "../Rectangle.js";

export class QuickSort{
    constructor(array){
        this.arr = [...array]
        this.n = this.arr.length
        this.animation_array = [[...array]]
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

    quicksort(low, high){
        if(low < high){
            let p_idx = this.partition(low, high)
            this.quicksort(low, p_idx-1)
            this.quicksort(p_idx+1, high)
        }
    }
    swap(i,j){
        //console.log("i:",i,"j:",j)
        let temp = [...this.arr][i] // ref
        this.arr[i] = this.arr[j]
        this.arr[j] = temp
        //console.log([...this.arr])
    }
    partition(low, high){
        let pivot = this.arr[high].getNumber()
        this.saveAnimation_hijoDe(high, true, false) // selected
        let i = low - 1
        for(let j=low; j < high; j++){
            this.saveAnimation_hijoDe(j, true, false) // scan & selected
            if(this.arr[j].getNumber() < pivot){
                i++;
                //console.log("pivot:",pivot,"; index pivot: ",high)
                this.saveAnimation_hijoDe(i, true, false) // scan & selected
                this.swap(i,j)

                this.saveAnimation_hijoDe(i, false, true) // sort
                this.saveAnimation_hijoDe(j, false, true) // sort

                this.saveAnimation_hijoDe(i, false, false) // clean
                this.saveAnimation_hijoDe(j, false, false) // clean
            }
        }
        //console.log([...this.arr])
        this.saveAnimation_hijoDe(i+1, true, false)
        this.swap(i+1,high)
        this.saveAnimation_hijoDe(i+1, false, true)
        this.saveAnimation_hijoDe(high, false, true)

        this.saveAnimation_hijoDe(i+1, false, false)
        this.saveAnimation_hijoDe(high, false, false)
        return i+1
    }
}