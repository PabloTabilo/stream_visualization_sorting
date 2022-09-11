import { Rectangle } from "../Rectangle.js";

export class AlgorithmsSortings{
    constructor(array){
        this.arr = [...array];
        this.n = array.length;
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
    saveAnimationWithNotReference(idx,selected,sorted){
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
        let temp = [...this.arr][i] // ref
        this.arr[i] = this.arr[j]
        this.arr[j] = temp
    }
    get_each_state_arr_objs = () => this.animation_array
    get_arr_objs = () => this.arr
    get_arr_num = () => {
        let temp = []
        for(let i=0; i<this.n;i++){
            temp.push(this.arr[i].getNumber())
        }
        return temp
    }

    sort(){}
}