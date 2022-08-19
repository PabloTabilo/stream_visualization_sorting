import { Rectangle } from "./Rectangle.js";
import { MergeSort } from "./algorithms_sorting/MergeSort.js";

const resetBtn = document.getElementById("reset");
const mergeBtn = document.getElementById("merge");

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// size of array that we need to sort
let n = 90
// number of pixels per element on array
let limit_num = canvas.width / n
// max value on array
let limit_val = 400
// value that we use for view on canvas lower values like {1, 2, 3, 4, ...., 16, ....}
let threshold_for_low_values = 0;
// Save state of init and end array that need to be sorted
let save_state = []
// use for map the bars from canvas with click point from user
// user can ans value of a bar and get the number
let map_rectangle_with_coords = []
// The random numbers on init state
let random_numbers = Array.from({length: n}, () => Math.floor(Math.random() * limit_val)+1)
// Save state of the array meanwhile is sorted
let random_numbers_animation = []
// start for timestamp >> delay for human eye
let start = 0;
// pointer for init animation of sorted array process
let i = 0;

function reset(){
    i = 0;
    start = 0;
    save_state = []
    map_rectangle_with_coords = []
    random_numbers_animation = []
}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    let max_value = Math.max(...random_numbers)
    let min_value = Math.min(...random_numbers)
    let normalize_random_numbers = random_numbers.map((x) => (x - min_value) / (max_value - min_value))
    let normalize_random_numbers_ref_canvas_height = normalize_random_numbers.map((x) => Math.floor(x * canvas.height)+threshold_for_low_values)
    let r_i;
    //let random_color = ["#D3FF33", "#33FFBC", "#B233FF"]
    let j = 0;
    for(let i = 0; i < canvas.width; i+=limit_num){
        if(j>=n) break;
        //r_i = new Rectangle(i, 5, limit_num,normalize_random_numbers_ref_canvas_height[j],context,random_color[Math.floor(Math.random() * random_color.length)],random_numbers[j])
        r_i = new Rectangle(i, 5, limit_num,normalize_random_numbers_ref_canvas_height[j],context,"rgba(211, 255, 51, "+normalize_random_numbers[j].toString()+")",random_numbers[j])
        save_state.push(r_i);
        map_rectangle_with_coords.push(i+limit_num)
        r_i.drawRectangle()
        j++;
    }
}

function redraw(){
    let j = 0
    for(let i = 0; i < canvas.width; i+=limit_num){
        if(j>=n) break;
        save_state[j].setX(i)
        save_state[j].drawRectangle()
        j++;
    }
}

function init(){
    reset()
    clear()
    draw()
}

function animate(timestamp) {
    if(i >= n) return;
    const elapsed = timestamp - start;
    if (elapsed > 150) {
        start = timestamp;
        clear();
        save_state = random_numbers_animation[i];
        redraw();
        i+=1
    }
    requestAnimationFrame(animate);
}


canvas.addEventListener("click", (e) => {
    let clientX = e.clientX
    let clientY = e.clientY
    let i = 0;
    while(map_rectangle_with_coords[i] < clientX){
        i++;
    }
    console.log(save_state[i].numero);
})

let my_merge = () => {
    let inst_merge = new MergeSort(save_state)
    inst_merge.merge(0,n-1)
    // order process of merge sorting
    random_numbers_animation = inst_merge.animation_array
    // final ans >> sorted array >> inst_merge.get_arr()
    clear()
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    requestAnimationFrame(animate);
}

init()

resetBtn.addEventListener("click", (e) => {
    random_numbers = Array.from({length: n}, () => Math.floor(Math.random() * limit_val)+1)
    init()
})

mergeBtn.addEventListener("click", (e) => my_merge())

