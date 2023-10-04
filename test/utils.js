

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
        [1,1]
    ],
    [
        [1,1,0],
        [0,1,1]
    ],
    [        
        [1],
        [1],
        [1],
        [1]
    ]
]

let num = 0;

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


export function rotate_piece(piece) {
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
    let t = piece.w;
    piece.w = piece.h;
    piece.h = t;
    piece.blocks = n_arr;
};


function new_active(piece) {
    piece.x = 0;
    piece.y = 0;
    piece.blocks = figures[num];
    piece.h = figures[num].length;
    piece.w = figures[num][0].length;
    //num = (num + 1) % figures.length;
};

function delete_full_line(field) {
    for(let i = field.length - 1; i >= 0; i--) {
        let sum = field[i].reduce((a, b) => a + b);
        if(sum == field[i].length)
            field[i] = field[i].map((v) => 0);  
    }
}

function add_figure(field, piece) {
    for(let i = 0; i < piece.h; i++) {
        for(let j = 0; j < piece.w; j++) {
            if(field[i + piece.y][j + piece.x] === 0 && piece.blocks[i][j] != 0)
            field[i + piece.y][j + piece.x] = piece.blocks[i][j]
        }
    }
    new_active(piece);
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
    if(border_x(field, piece, dx))
        return 0;
    if(border_y(field, piece, dy) || collisian(field, piece, dx, dy) ) {
        add_figure(field, piece);
        new_active(piece);
        console.log(num);
        return 0;
    }
    piece.y += dy;
    piece.x += dx;
    console.log(dx, dy);
    return 1;
};


