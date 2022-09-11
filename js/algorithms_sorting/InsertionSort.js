import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class InsertionSort extends AlgorithmsSortings{
    constructor(arr){
        super(arr)
    }

    sort(){
        // O(n^2)
        for(let i = 1; i<this.n; i++){ // - O(n)
            let key = this.arr[i].getNumber() // need to sort - think is minimum
            let key_obj = this.clone(this.arr[i])
            let j = i-1
            this.saveAnimationWithNotReference(i,true,false)
            // where locate the element (key) when i think
            // that the while is a sorted array
            while(j>=0 && this.arr[j].getNumber()>key){ // O(n)
                this.arr[j+1] = this.arr[j]
                this.saveAnimationWithNotReference(j+1,false,true)
                j--;
            }
            this.arr[j+1] = key_obj
            //this.arr[j+1] = key
            this.saveAnimationWithNotReference(j+1,false,true)
        }
    }
}