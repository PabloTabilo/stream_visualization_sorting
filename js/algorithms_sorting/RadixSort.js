import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class RadixSort extends AlgorithmsSortings{
    constructor(array){
        super(array)
        this.k = 0
        this.bucket = Array(10).fill([])
    }

    get_k(){
        this.arr.forEach(e => {
            this.k = Math.max(this.k, e.getNumberStr().length)
        })
    }

    prepend0(){
        for(let i = 0; i < this.n; i++){
            while(this.k - this.arr[i].getNumberStr().length){
                this.arr[i].setNumberStr("0"+this.arr[i].getNumberStr())
            }
        }
    }

    sorting(){
        // O(k * n)
        this.k--
        while(this.k >= 0){
            // preorder array
            for(let i=0; i < this.n; i++){
                this.saveAnimationWithNotReference(i,true,false);
                let idx = parseInt(this.arr[i].getNumberStr()[this.k])
                if(this.bucket[idx].length <= 0){
                    this.bucket[idx] = [this.arr[i]]
                }else{
                    this.bucket[idx].push(this.arr[i])
                }
            }
            let l = 0
            // postorder
            // O(1)
            for(let i=0; i<10;i++){
                //O(n)
                this.bucket[i].forEach(e=>{
                    if(this.debug) console.log("bucket i: ",i,"element e: ",e," idx l: ",l)
                    this.saveAnimationWithNotReference(l,true,false)
                    this.arr[l] = e
                    this.saveAnimationWithNotReference(l,false,true)
                    this.saveAnimationWithNotReference(l,false,false)
                    l++;
                })
                this.bucket[i] = []
            }
            this.k--
        }
    }

    clean0s(){
        for(let i=0; i<this.n;i++){
            this.arr[i].setNumberStr(parseInt(this.arr[i].getNumberStr()).toString())
        }
    }

    sort(){
        this.get_k() // 1. Get k = max number of digits
        this.prepend0() // 2. prepend 0 like string
        this.sorting() // 3. sorting process
        this.clean0s() // 4. clean 0s prepend
    }

}

// O(n*k)
// n : size
// k : number of digits