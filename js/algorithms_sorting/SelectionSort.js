import { AlgorithmsSortings } from "./AlgorithmsSortings.js";

export class SelectionSort extends AlgorithmsSortings{
    sort(){
        for(let i = 0; i < this.n; i++){
            let min_value = this.arr[i].getNumber();
            let min_idx = i;
            this.saveAnimationWithNotReference(min_idx,true,false)
            for(let j = i+1; j<this.n; j++){
                if(min_value > this.arr[j].getNumber()){
                    this.saveAnimationWithNotReference(min_idx,false,false)
                    min_value = this.arr[j].getNumber();
                    min_idx = j;
                    this.saveAnimationWithNotReference(min_idx,true,false)
                }
            }
            if(min_idx != i){
                this.saveAnimationWithNotReference(i,true,false)
                this.saveAnimationWithNotReference(min_idx,true,false)

                this.swap(i,min_idx)

                this.saveAnimationWithNotReference(i,true,false)
                this.saveAnimationWithNotReference(min_idx,true,false)

                this.saveAnimationWithNotReference(i,false,false)
                this.saveAnimationWithNotReference(min_idx,false,false)
            }
        }
    }
}