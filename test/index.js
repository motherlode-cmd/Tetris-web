import {create_player} from './app.js'
import {rotate_piece, move, get_next, end_game, new_game, get_score} from './utils.js';
import {draw_field, get_lines, draw_next } from './view.js';
import { button_animation } from './button_animation.js';
let field_canvas = document.getElementsByClassName("field")[0];
let next_figure_canvas = document.getElementsByClassName("next_figure")[0];
get_lines(field_canvas, 10, 20);
get_lines(next_figure_canvas, 5, 4);
let field_context = field_canvas.getContext("2d");
let next_figure_context = next_figure_canvas.getContext("2d");

let player = create_player();
let is_paused = undefined;

function t(field_context, rows, cols, height, width, active_piece, field_array, next_figure_context) {
    move(field_array, active_piece, 0, 1);  
    draw_field(field_context, rows, cols, height, width, active_piece, field_array);
    let next_figure_array = get_next(4, 5);
    draw_next(next_figure_array, next_figure_context);
    get_score(player);
    document.getElementById('score').textContent = player.score;
    document.getElementById('lines').textContent = player.lines;
    document.getElementById('level').textContent = player.level;
    return end_game(field_array, active_piece);
}

function keydown_event_listener(player, field_canvas, field_context, e) {
    if(!is_paused) {
        if(e.code === 'ArrowUp')
        rotate_piece(player.play_field, player.active_piece);
        else if(e.code === 'ArrowDown') 
            move(player.play_field, player.active_piece, 0, 1);
        else if(e.code === 'ArrowLeft') 
            move(player.play_field, player.active_piece, -1, 0);
        else if(e.code === 'ArrowRight') 
            move(player.play_field, player.active_piece, 1, 0);
        draw_field(field_context, 20, 10, field_canvas.height/20, field_canvas.width/10, player.active_piece, player.play_field);
        get_score(player);
        document.getElementById('score').textContent = player.score;
    }
}

function add_top(name, score) {
    let top_users = localStorage.getItem("top_user");
    let user_array = [];
    if (top_users) {
        user_array = JSON.parse(top_users);
    } 
    const userIndex = user_array.find((a) => a.name === name && a.score === score)
    if(userIndex === undefined)
        user_array.push({name, score});
    user_array.sort((a,b) => b.score - a.score);
    user_array = user_array.slice(0, 5);
    update_top(user_array);
    localStorage.setItem('top_user', JSON.stringify(user_array));
}

function update_top(data) {
    let table = document.getElementsByClassName("table")[0];
    table.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement("div");
        row.classList.add("row"); 
        row.textContent = item.name + " " + item.score;
        table.appendChild(row);
        if (index >= 4) {
            return;
        }
    });
}
function every_time() {
    let status_game = t(field_context, 20, 10, field_canvas.height/20, field_canvas.width/10, player.active_piece, player.play_field, next_figure_context)
    if(status_game === true) {
        console.log("end", player.name, player.score);
        add_top(player.name, player.score);
        clearInterval(timer);
        timer = undefined;
        is_paused = true;
    }
}

document.addEventListener("keydown", keydown_event_listener.bind(Event, player, field_canvas, field_context));
let timer;
if(localStorage.getItem("top_user"))
    update_top(JSON.parse(localStorage.getItem("top_user")))

function start_game() {
    is_paused = false;
    document.getElementById('level').textContent = player.level;
    new_game(player.play_field, player.active_piece);
    player.score = 0;
    player.level = 1;
    player.name = username;
    console.log(player);
    draw_field(field_context, 20, 10, field_canvas.height/20, field_canvas.width/10, player.active_piece, player.play_field);
    pause.textContent = "pause";
    if(timer == undefined)
        timer = setInterval(every_time, 500 - player.level * 10);
 }

function pause_game() {
    if(!is_paused) {
        clearInterval(timer);
        timer = undefined;
        pause.textContent = "Continue";
    } else if(is_paused){
        timer = setInterval(every_time, 500 - player.level * 10);
        pause.textContent = "pause";
    }
    is_paused = !is_paused;
    button_animation(pause);
}

const start = document.querySelector('#start');
start.addEventListener('click', start_game);

const pause = document.querySelector('#pause');
pause.addEventListener('click', pause_game);

let username = "No";

button_animation(pause);
button_animation(start);

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("myForm");
    const usernameInput = document.getElementById("usernameInput");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        username = usernameInput.value;
        start_game();
    });
});
