import { Rectangle } from "./Rectangle.js";
import { MergeSort } from "./algorithms_sorting/MergeSort.js";

const resetBtn = document.getElementById("reset");
const mergeBtn = document.getElementById("merge");

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let n = 20
let limit_val = 400
let save_state = []
let map_rectangle_with_coords = []
let random_numbers = Array.from({length: n}, () => Math.floor(Math.random() * limit_val)+1)

function clear(){
    save_state = []
    map_rectangle_with_coords = []
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function draw(){
    console.log(random_numbers)
    // Default vs input user vs se llene data aleatoria
    let threshold_for_low_values = 0;
    let max_value = Math.max(...random_numbers)
    let min_value = Math.min(...random_numbers)
    let normalize_random_numbers = random_numbers.map((x) => (x - min_value) / (max_value - min_value))
    let normalize_random_numbers_ref_canvas_height = normalize_random_numbers.map((x) => Math.floor(x * canvas.height)+threshold_for_low_values)

    let limit_num = canvas.width / n
    let r_i;
    let random_color = ["#D3FF33", "#33FFBC", "#B233FF"]
    let j = 0;
    for(let i = 0; i < canvas.width; i+=limit_num){
        r_i = new Rectangle(i, 5, limit_num,normalize_random_numbers_ref_canvas_height[j],context,random_color[Math.floor(Math.random() * random_color.length)],random_numbers[j])
        save_state.push(r_i);
        map_rectangle_with_coords.push(i+limit_num)
        r_i.draw()
        j++;
    }
}

function init(){
    clear()
    draw()
}

/*
async function animate_draw(animation_array, current_state){

}

let start = 0;

function animate(timestamp) { 
  const elapsed = timestamp - start;
  if (elapsed > 200) {
    start = timestamp;
    animate_that_draw_state_array();
  }
  requestAnimationFrame(animate); 
}
*/


//console.log(save_state)
//console.log(map_rectangle_with_coords)

canvas.addEventListener("click", (e) => {
    let clientX = e.clientX
    let clientY = e.clientY
    //console.log("x,y = ",clientX,",",clientY);
    let i = 0;
    while(map_rectangle_with_coords[i] < clientX){
        i++;
    }
    //console.log(i)
    console.log(save_state[i].numero);

})

let my_merge = () => {
    let inst_merge = new MergeSort(random_numbers)
    inst_merge.merge(0,n-1)
    //console.log(inst_merge.array_index)
    console.log(inst_merge.animation_array)
    clear()
    draw()
}

init()
resetBtn.addEventListener("click", (e) => {
    random_numbers = Array.from({length: n}, () => Math.floor(Math.random() * limit_val)+1)
    init()
})
mergeBtn.addEventListener("click", (e) => my_merge())

