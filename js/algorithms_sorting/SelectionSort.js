export class SelectionSort{
    constructor(arr){
        this.arr = [...arr]
        this.n = arr.length;
    }
    swap(i,j){
        //console.log("i:",i,"j:",j)
        let temp = [...this.arr][i] // ref
        this.arr[i] = this.arr[j]
        this.arr[j] = temp
        //console.log([...this.arr])
    }
    sort(){
        for(let i = 0; i < this.n; i++){
            let min_value = this.arr[i];
            let min_idx = i;
            for(let j = i+1; j<this.n; j++){
                if(min_value > this.arr[j]){
                    min_value = this.arr[j];
                    min_idx = j;
                }
            }
            if(min_idx != i){
                this.swap(i,min_idx)
            }
        }
    }
}