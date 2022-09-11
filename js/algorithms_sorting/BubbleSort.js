import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class BubbleSort extends AlgorithmsSortings{
    sort(){
        // need to scan O(n)
        for(let i = 0; i < this.n - 1; i++){
            // Sort for finish
            for(let j = 0; j<this.n-i-1; j++){
                this.saveAnimationWithNotReference(j,true,false)
                this.saveAnimationWithNotReference(j+1,true,false)
                if(this.arr[j].getNumber() > this.arr[j+1].getNumber()){
                    this.swap(j,j+1);
                    this.saveAnimationWithNotReference(j,false,true)
                    this.saveAnimationWithNotReference(j+1,false,true)
                }
                this.saveAnimationWithNotReference(j,false,false)
                this.saveAnimationWithNotReference(j+1,false,false)
            }
        }
    }
}