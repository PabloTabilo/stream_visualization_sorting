// time complexity worst case - O(n log n)
// space complexity O(n)
import { Rectangle } from "../Rectangle.js";
export class MergeSort{
    constructor(arr){
        this.array = [...arr]
        this.n = arr.length;
        this.array_index = []
        this.animation_array = [[...arr]]
    }
    get_arr = () => {
        let temp = []
        for(let i=0; i<this.array.length;i++){
            temp.push(this.array[i].getNumber())
        }
        return temp
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
        for(let w =0; w < this.n; w++) local_arr[w] = this.clone(this.array[w])
        if(selected || sorted){
            if(selected) local_arr[idx].setSelection()
            else local_arr[idx].setSelectionSorted()
        }else{
            for(let i=0; i<this.n; i++) local_arr[i].resetSelection()
        }
        this.animation_array.push([...local_arr])
    }

    mergeSorting(l, mid, r){
        // Space complexity: O(n)
        let n1 = mid - l + 1
        let n2 = r - mid
        let L = Array(n1).fill(0);
        let R = Array(n2).fill(0);

        for(let i = 0; i<n1; i++){
            L[i] = this.array[l+i]
            this.saveAnimation_hijoDe(l+i,true,false)
        }
        for(let i = 0; i<n2; i++){
            R[i] = this.array[mid+1+i]
            this.saveAnimation_hijoDe(mid+1+i,true,false)
        }
        // Sorting
        let i = 0
        let j = 0
        let k = l
        while(i < n1 && j < n2){
            if(L[i].getNumber() < R[j].getNumber()){
                this.array[k] = L[i];
                i++;
            }else{
                this.array[k] = R[j];
                j++;
            }
            this.saveAnimation_hijoDe(k,false,true)
            k++;
        }
        while(i<n1){
            this.array[k] = L[i];
            i++;
            k++;
        }
        while(j<n2){
            this.array[k] = R[j];
            j++;
            k++;
        }
        //track but with more shit
        this.saveAnimation_hijoDe(0,false,false)
        // tracking current sorting position
        //this.animation_array.push([...this.array])
    }
}
// odd >> 11
// [0, 289, 17, 150, 31, 325, 288, 272, 250, 179, 69]
// even >> 8
// [0, 289, 150, 325, 272, 250, 179, 69]

// mid = floor(size / 2) - 1
