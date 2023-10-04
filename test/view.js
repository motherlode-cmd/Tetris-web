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

let color_collection = new Map();
color_collection.set(0, 'blue');  
color_collection.set(1, 'red');   
color_collection.set(2, 'yellow');   
color_collection.set(3, 'green');  

export function draw_field(canvas, row, col, active_piece, field) {
    let ctx = canvas.getContext("2d");
    let height = canvas.height / row;
    let width = canvas.width / col;
    for( let i = 0; i < canvas.height; i++) {
        for( let j = 0; j < canvas.width; j++) {
            let options = i in field && j in field[i] ? field[i][j] : '';
            ctx.fillStyle = color_collection.get(options);
            ctx.fillRect(j  * width, i * height, height, width);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    for (let i = 0; i < active_piece.h; i++) {
        for (let j = 0; j < active_piece.w; j++) {
            let options = i in active_piece.blocks && j in active_piece.blocks[i] ? active_piece.blocks[i][j] : '';
            if(options != 0) {
                ctx.fillStyle = color_collection.get(active_piece.blocks[i][j]);
                ctx.fillRect((j + active_piece.x) * width, (i + active_piece.y) * height, height, width);
            }
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
};

export function draw_next(field, canvas) {
    let ctx = canvas.getContext("2d");
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 5; j++) {
            let options = i in field && j in field[i] ? field[i][j] : 0;
            ctx.fillStyle = color_collection.get(options);
            ctx.fillRect(j  * 30, i * 30, 30, 30);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}