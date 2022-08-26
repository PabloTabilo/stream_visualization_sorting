export class InsertionSort{
    constructor(arr){
        this.arr = [...arr]
        this.n = this.arr.length
    }
    sort(){
        // O(n^2)
        for(let i = 1; i<this.n; i++){ // - O(n)
            let key = this.arr[i] // need to sort - think is minimum
            let j = i-1
            // where locate the element (key) when i think
            // that the while is a sorted array
            while(j>=0 && this.arr[j]>key){ // O(n)
                this.arr[j+1] = this.arr[j]
                j--;
            }
            this.arr[j+1] = key
        }
    }
}