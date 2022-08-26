// time complexity
// A nivel medio -> O(n log n) - pivot ~ median
// worst case O(n^2)

// Space complexity
// swap

export class QuickSort{
    constructor(array){
        this.arr = [...array]
    }
    quicksort(low, high){
        if(low < high){
            let p_idx = this.partition(low, high)
            this.quicksort(low, p_idx-1)
            this.quicksort(p_idx+1, high)
        }
    }
    swap(i,j){
        console.log("i:",i,"j:",j)
        let temp = [...this.arr][i] // ref
        this.arr[i] = this.arr[j]
        this.arr[j] = temp
        console.log([...this.arr])
    }
    partition(low, high){
        let pivot = this.arr[high]
        let i = low - 1
        for(let j=low; j < high; j++){
            if(this.arr[j] < pivot){
                i++;
                console.log("pivot:",pivot,"; index pivot: ",high)
                this.swap(i,j)
            }
        }
        console.log([...this.arr])
        this.swap(i+1,high)
        return i+1
    }
}