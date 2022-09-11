import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class QuickSort extends AlgorithmsSortings{
    // Override
    sort(){
        this.quicksort(0,this.n-1)
    }

    quicksort(low, high){
        if(low < high){
            let p_idx = this.partition(low, high)
            this.quicksort(low, p_idx-1)
            this.quicksort(p_idx+1, high)
        }
    }

    partition(low, high){
        let pivot = this.arr[high].getNumber()
        this.saveAnimationWithNotReference(high, true, false) // selected
        let i = low - 1
        for(let j=low; j < high; j++){
            this.saveAnimationWithNotReference(j, true, false) // scan & selected
            if(this.arr[j].getNumber() < pivot){
                i++;
                this.saveAnimationWithNotReference(i, true, false) // scan & selected
                this.swap(i,j)

                this.saveAnimationWithNotReference(i, false, true) // sort
                this.saveAnimationWithNotReference(j, false, true) // sort

                this.saveAnimationWithNotReference(i, false, false) // clean
                this.saveAnimationWithNotReference(j, false, false) // clean
            }
        }
        this.saveAnimationWithNotReference(i+1, true, false)
        this.swap(i+1,high)
        this.saveAnimationWithNotReference(i+1, false, true)
        this.saveAnimationWithNotReference(high, false, true)

        this.saveAnimationWithNotReference(i+1, false, false)
        this.saveAnimationWithNotReference(high, false, false)
        return i+1
    }
}

// time complexity
// A nivel medio -> O(n log n) - pivot ~ median
// worst case O(n^2)
// Space complexity
// swap