import { Rectangle } from "./Rectangle.js";
import { MergeSort } from "./algorithms_sorting/MergeSort.js";
import { RadixSort } from "./algorithms_sorting/RadixSort.js";
import { QuickSort } from "./algorithms_sorting/QuickSort.js";
import { InsertionSort } from "./algorithms_sorting/InsertionSort.js";
import { SelectionSort } from "./algorithms_sorting/SelectionSort.js";
import { BubbleSort } from "./algorithms_sorting/BubbleSort.js";

const resetBtn = document.getElementById("reset");
const sortme = document.getElementById("sortme");
const selection = document.getElementById("sortings")

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = document.documentElement.clientWidth;
canvas.height = parseInt(document.documentElement.clientHeight*.6);

let change_n_by_width_client = () => {
    let w = document.documentElement.clientWidth;
    if(w >= 1000) return 60
    else if(w >= 800) return 45
    else if(w >= 600) return 40
    else if(w >= 500) return 30
    else if(w >= 400) return 25
    else return 15
}

// size of array that we need to sort
let n = change_n_by_width_client()
// Variables to control animation
let stop_animation = n
var global_dif_time = 5
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
// Global selection
let selected_algorithm;

function reset(){
    i = 0
    start = 0
    stop_animation = n
    save_state = []
    map_rectangle_with_coords = []
    random_numbers_animation = []
}

function clear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    // Normalize >> each value of array is between
    // [0, 1]
    let max_value = Math.max(...random_numbers)
    let min_value = Math.min(...random_numbers)
    let normalize_random_numbers = random_numbers.map((x) => (x - min_value) / (max_value - min_value))
    // know height of each bars
    let normalize_random_numbers_ref_canvas_height = normalize_random_numbers.map((x) => Math.floor(x * canvas.height)+threshold_for_low_values)

    // declare object Rectangle (62 line)
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
    reset() // update of global variables >> save state
    clear() // clear canvas
    draw() // draw original from 0 >> reset global vars
}

function animate(timestamp) {
    if(i >= stop_animation) return;
    const elapsed = timestamp - start;
    //console.log("elpased dif: ", elapsed)
    if (elapsed > global_dif_time) {
        //console.log("i:",i)
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
    let i = 0;
    while(map_rectangle_with_coords[i] < clientX){
        i++;
    }
    console.log(save_state[i].numero);
})

function call_animation(){
    clear()
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    requestAnimationFrame(animate);
}



let sort_me = (option) => {
    switch(parseInt(option)){
        case 0:
            selected_algorithm = new MergeSort(save_state)
            break;
        case 1:
            selected_algorithm = new QuickSort(save_state)
            break;
        case 2:
            selected_algorithm = new InsertionSort(save_state)
            break;
        case 3:
            selected_algorithm = new SelectionSort(save_state)
            break;
        case 4:
            selected_algorithm = new BubbleSort(save_state)
            break;
        case 5:
            selected_algorithm = new RadixSort(save_state)
            break;
    }
    console.log("previus-sort")
    console.log(selected_algorithm.get_arr_num())
    selected_algorithm.sort()
    console.log("sorted")
    console.log(selected_algorithm.get_arr_num())
    random_numbers_animation = selected_algorithm.get_each_state_arr_objs()
    stop_animation = random_numbers_animation.length
    call_animation()

}

// init run if refresh
init()
resetBtn.addEventListener("click", (e) => {
    // reset random numbers array
    random_numbers = Array.from({length: n}, () => Math.floor(Math.random() * limit_val)+1)
    init()
})

sortme.addEventListener("click", (e) => {sort_me(selection.value)})
