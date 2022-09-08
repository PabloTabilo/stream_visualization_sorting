export class BubbleSort{
    constructor(arr){
        this.arr = [...arr];
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
        for(let i = 0; i < this.n - 1; i++){
            for(let j = 0; j<this.n-i-1; j++){
                if(this.arr[j] > this.arr[j+1]){
                    this.swap(j,j+1);
                }
            }
        }
    }
}