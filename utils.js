
export let figures = [
    [
        [1,1,1],
        [0,1,0]
    ],
    [
        [1,1],
        [0,1],
        [0,1]
    ],
    [
        [1,1],
        [1,0],
        [1,0]
    ],
    [
        [1,1],
        [1,1]
    ],
    [
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,1],
        [1,1,0]
    ],
    [        
        [1],
        [1],
        [1],
        [1]
    ]
]

let num = 0;

let step_score = 0;

let step_lines = 0;

export function get_score(player) {
    player.score += step_score * player.level;
    player.lines += step_lines;
    if(player.lines % 3 === 0 && step_lines != 0) player.level++;
    step_lines = 0;
    step_score = 0;
    
}

export function get_next(h, w) {   
    let x = Math.floor((w - figures[num][0].length) / 2);
    let y = Math.floor((h - figures[num].length) / 2);
    let field = new Array(h);          
    for (let i = 0; i < h; i++) {
        field[i] = new Array(w); 
        for(let j = 0; j < w; j++) {
            field[i][j] = 0;
        }      
    }
    for (let i = 0; i < figures[num].length; i++) {
        for(let j = 0; j < figures[num][0].length; j++) {
            field[(i + y) % h][(j + x) % w] = figures[num][i][j];
        }      
    }
    return field;
};


export function rotate_piece(field, piece) {
    let n_arr= []; // новый перевёрнутый массив
    let n_rows = piece.blocks[0].length;   // количество новых строк
    let n_cols = piece.blocks.length;      // количество новых столбцов
    for(let x = 0; x < n_rows; x++){
        let row_arr = []; // это элемент из нового массива
        for(let y = (n_cols - 1), z = 0; y >= 0; y--, z++){
            row_arr[z] = piece.blocks[y][x];
        }
        n_arr[x] = row_arr;
    }
    let new_piece = {
        x: piece.x,
        y: piece.y,
        h: piece.w,
        w: piece.h,
        blocks: n_arr
    }
    if(!collisian(field, new_piece, 0, 0) && !border_x(field, new_piece, 0) && !border_y(field, new_piece, 0)) {
        piece.blocks = n_arr;
        piece.w = new_piece.w;
        piece.h = new_piece.h;
    }
};


function new_active(piece, w) {
    piece.blocks = figures[num];
    piece.h = figures[num].length;
    piece.w = figures[num][0].length;
    piece.x = Math.floor((w - figures[num][0].length) / 2);
    piece.y = 0;
    num = (num + 1) % figures.length;

};

function delete_full_line(field) {
    let highter_line = 0;
    for(let i = 0; i < field.length; i++) {
        let sum = field[i].reduce((a, b) => a + b);
        if(sum == field[i].length) {
            step_lines++;
            highter_line = i;
            field[i] = field[i].map((v) => 0);
            for(let line = i; line >= 1; line--) {
                field[line] = field[line - 1];
            }
            field[0] = field[0].map((v) => 0);
            step_score += 10;
        }  
    }
    //delete
}

function add_figure(field, piece) {
    for(let i = 0; i < piece.h; i++) {
        for(let j = 0; j < piece.w; j++) {
            if(field[i + piece.y][j + piece.x] === 0 && piece.blocks[i][j] != 0)
            field[i + piece.y][j + piece.x] = piece.blocks[i][j]
        }
    }
    step_score += 4;
    new_active(piece, field[0].length);
    delete_full_line(field);
};

function border_y(field, piece, dy) {
    return piece.y + dy < 0 || piece.y + piece.h + dy > field.length;
};

function border_x(field, piece, dx) {
    return piece.x + dx < 0 || piece.x + piece.w + dx > field[0].length;
};

function collisian(field, piece, dx, dy) {
    for(let i = 0; i < piece.h; i++) {
        for(let j = 0; j < piece.w; j++) {
            if(field[i + piece.y + dy][j + piece.x + dx] != 0 && piece.blocks[i][j] != 0) {
                return true;
            }
        }
    }
    return false;
};


export function move(field, piece, dx, dy) {
    step_score = 0;
    if(border_x(field, piece, dx) || collisian(field, piece, dx, 0))
        return 0;
    if(border_y(field, piece, dy) || collisian(field, piece, dx, dy) ) {
        add_figure(field, piece);
        return 0;
    }
    piece.y += dy;
    piece.x += dx;
    return 1;
};

export function end_game(field, active_piece) {
    return collisian(field, active_piece, 0, 0);
}

export function new_game(field, active_piece) {
    num = 0;
    for(let i = 0; i < field.length; i++)
        field[i] = field[i].map((v) => 0);
    new_active(active_piece, field[0].length)
    num = (num + 1) % figures.length;
}

