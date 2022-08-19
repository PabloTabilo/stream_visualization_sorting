// O(n log n)
export class MergeSort{
    constructor(arr){
        this.array = [...arr]
        this.array_index = []
        this.animation_array = [[...arr]]
    }
    get_arr = () => this.array;

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
            L[i] = this.array[l+i]
        }
        for(let i = 0; i<n2; i++){
            R[i] = this.array[mid+1+i]
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
        // tracking current sorting position
        this.animation_array.push([...this.array])
    }
}
// odd >> 11
// [0, 289, 17, 150, 31, 325, 288, 272, 250, 179, 69]
// even >> 8
// [0, 289, 150, 325, 272, 250, 179, 69]

// mid = floor(size / 2) - 1
