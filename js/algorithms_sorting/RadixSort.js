// O(n*k)
// n : size
// k : number of digits

export class RadixSort{
    constructor(array){
        this.arr = [...array];
        this.n = array.length;
        this.arr_str = [...array].map(i=>i.toString())
        this.k = 0
        this.bucket = Array(10).fill([])
        this.debug = true
        // 1. Get k = max number of digits
        this.get_k()
        // 2. prepend 0 like string
        this.prepend0()
        if(this.debug){
            console.log("k = ",this.k)
            console.log("arr_str = ", this.arr_str)
        }
    }
    get_k(){
        this.arr_str.forEach(i => {
            this.k = Math.max(this.k, i.length)
        })
    }
    prepend0(){
        for(let i = 0; i < this.n; i++){
            while(this.k - this.arr_str[i].length){
                this.arr_str[i] = "0"+this.arr_str[i]
            }
        }
    }
    sorting(){
        // O(k * n)
        this.k--
        while(this.k >= 0){
            // preorder array
            for(let i=0; i < this.n; i++){
                if(this.debug){
                    console.log("i:",i," arr_str[i][k]:",this.arr_str[i][this.k]," arr_str[i]:",this.arr_str[i])
                    console.log("int : ",parseInt(this.arr_str[i][this.k]))
                }
                if(this.bucket[parseInt(this.arr_str[i][this.k])].length <= 0){
                    this.bucket[parseInt(this.arr_str[i][this.k])] = [this.arr_str[i]]
                }else{
                    this.bucket[parseInt(this.arr_str[i][this.k])].push(this.arr_str[i])
                }
                console.log("bucket-inorder:",[...this.bucket])
                //console.log("bucket-inorder:",this.bucket)
            }
            if(this.debug) console.log("k:",this.k)
            if(this.debug) console.log("bucket - post order:",[...this.bucket])
            let l = 0
            // postorder
            // O(1)
            for(let i=0; i<10;i++){
                //O(n)
                this.bucket[i].forEach(e=>{
                    if(this.debug) console.log("bucket i: ",i,"element e: ",e," idx l: ",l)
                    this.arr_str[l] = e
                    l++;
                })
                this.bucket[i] = []
            }
            if(this.debug) console.log(this.arr_str)
            this.k--
        }
    }
    clean0s(){
        for(let i=0; i<this.n;i++){
            this.arr[i] = parseInt(this.arr_str[i])
        }
    }
}
