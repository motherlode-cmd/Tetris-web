import {score, lines, level, play_field, next_field, active_piece} from './app.js'
import {rotate_piece, move, get_next} from './utils.js';
import {draw_field, get_lines, draw_next } from './view.js';

function t(field_canvas, rows, cols, active_piece, field_array, next_figure_canvas) {
    draw_field(field_canvas, rows, cols, active_piece, field_array);
    move(field_array, active_piece, 0, 1);
    let next_figure_array = get_next(4, 5);
    draw_next(next_figure_array, next_figure_canvas);
}

function start_game() {
    let field = document.getElementsByClassName("field")[0];
    let next_figure = document.getElementsByClassName("next_figure")[0];
    get_lines(field, 10, 20);
    get_lines(next_figure, 5, 4);

    const timer = setInterval(
        () => t(field, 20, 10, active_piece, play_field, next_figure),
        81
    );

    document.addEventListener("keydown", (e) => {
        if(e.key === ' ')
            rotate_piece(active_piece);
        else if(e.code === 'ArrowDown') 
            move(play_field, active_piece, 0, 1);
        else if(e.code === 'ArrowLeft') 
            move(play_field, active_piece, -1, 0);
        else if(e.code === 'ArrowRight') 
            move(play_field, active_piece, 1, 0);
        //draw_field(field, 20, 10, active_piece, play_field);
    });
}

const start = document.querySelector('#start');
start.addEventListener('click', start_game);