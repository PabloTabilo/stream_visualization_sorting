import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class MergeSort extends AlgorithmsSortings{
    constructor(arr){
        super(arr)
        this.array_index = []
    }

    sort(){
        this.merge(0,this.n-1)
    }

    merge(l, r){
        if(l < r){
            let mid = Math.floor((l + r)/2)
            this.array_index.push([l,mid,r])
            // which index we want to sort
            this.merge(l, mid)
            this.merge(mid+1,r)
            this.mergeSorting(l, mid, r)
        }
    }

    mergeSorting(l, mid, r){
        // Space complexity: O(n)
        let n1 = mid - l + 1
        let n2 = r - mid
        let L = Array(n1).fill(0);
        let R = Array(n2).fill(0);

        for(let i = 0; i<n1; i++){
            L[i] = this.arr[l+i]
            this.saveAnimationWithNotReference(l+i,true,false)
        }
        for(let i = 0; i<n2; i++){
            R[i] = this.arr[mid+1+i]
            this.saveAnimationWithNotReference(mid+1+i,true,false)
        }
        // Sorting
        let i = 0
        let j = 0
        let k = l
        while(i < n1 && j < n2){
            if(L[i].getNumber() < R[j].getNumber()){
                this.arr[k] = L[i];
                i++;
            }else{
                this.arr[k] = R[j];
                j++;
            }
            this.saveAnimationWithNotReference(k,false,true)
            k++;
        }
        while(i<n1){
            this.arr[k] = L[i];
            i++;
            k++;
        }
        while(j<n2){
            this.arr[k] = R[j];
            j++;
            k++;
        }
        //track but with more shit
        this.saveAnimationWithNotReference(0,false,false)
        // tracking current sorting position
        //this.animation_array.push([...this.array])
    }
}

// time complexity worst case - O(n log n)
// space complexity O(n)

// odd >> 11
// [0, 289, 17, 150, 31, 325, 288, 272, 250, 179, 69]
// even >> 8
// [0, 289, 150, 325, 272, 250, 179, 69]

// mid = floor(size / 2) - 1
