export function get_lines(canvas, column_count, row_count) {
    let context = canvas.getContext("2d");
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
    let dx = canvas.width / column_count
    let dy = canvas.height / row_count
    for (let x = 0; x < canvas.width; x += dx) {
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
    }
    
    for (let y = 0; y < canvas.height; y += dy) {
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
    }
    context.strokeStyle = "#888";
    context.stroke();
};

function style_piece(i, j) {
    return `rgb(${Math.floor(255 - 12.25 * i)}, 
        ${Math.floor(255 - 22.5 * j)}, 
        120)`;
}

export function draw_field(ctx, row, col, height, width, active_piece, field) {
    for( let i = 0; i < row; i++) {
        for( let j = 0; j < col; j++) {
            let options = i in field && j in field[i] ? field[i][j] : '';
            ctx.fillStyle = options === 1 ? style_piece(i, j) : 'darkblue'
            ctx.fillRect(j  * width, i * height, height, width);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    for (let i = 0; i < active_piece.h; i++) {
        for (let j = 0; j < active_piece.w; j++) {
            let options = i in active_piece.blocks && j in active_piece.blocks[i] ? active_piece.blocks[i][j] : '';
            if(options != 0) {
                ctx.fillStyle = style_piece(i + active_piece.y, j + active_piece.x);
                ctx.fillRect((j + active_piece.x) * width, (i + active_piece.y) * height, height, width);
            }
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
};

export function draw_next(field, ctx) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            let options = i in field && j in field[i] ? field[i][j] : 0;
            ctx.fillStyle = options === 1 ? style_piece(i, j) : 'darkblue'
            ctx.fillRect(j  * 30, i * 30, 30, 30);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}