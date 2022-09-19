document.querySelectorAll('.page-player').forEach(item=>{
    let timeOut;
    let video = item.querySelector('.page-player__video');
    let play = item.querySelector('.page-player__play');
    let stop = item.querySelector('.page-player__stop');
    let canvas = item.querySelector('.page-player__circle');
    item.addEventListener('mouseover',e=>{
        if(e.path[0].classList.contains('page-player') && !e.path[0].classList.contains('active')){
            e.target.classList.add('hover');
            timeOut = setTimeout(()=>{
                //play.dispatchEvent(new Event('click'));
                draw_video_lines(canvas, 1, 360, 360, 369);
                e.target.classList.add('active');
            },6000)
        }
    })
    item.addEventListener('mouseout',e=>{
        if(e.path[0].classList.contains('page-player')) {
            e.target.classList.remove('hover');
            clearTimeout(timeOut);
        }
    })
    item.addEventListener('click',e=>{
        if(!item.classList.contains('active')){
            item.classList.remove('hover');
            //fix css bug :)
            function windowFullOpened(e){
                if(!item.classList.contains('active'))
                    return;
                item.classList.remove('on-transition');
                play.dispatchEvent(new Event('click'));
                if(canvas)
                    draw_video_lines(canvas, 1, 360, 360, 369);
                item.removeEventListener('transitionend',windowFullOpened);
            }
            canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            setTimeout(()=>{
                item.classList.add('active');
                item.classList.add('on-transition');
                item.addEventListener('transitionend',windowFullOpened);
            },1)
        }
    })

    play.addEventListener('click',e=>{
        play.classList.remove('active');
        stop.classList.add('active');
        if(video){
            video.play();
            //video.muted = false;
        }
    })
    stop.addEventListener('click',e=>{
        stop.classList.remove('active');
        play.classList.add('active');
        video?.pause();
    })
})
document.addEventListener('click',e=>{
    if(!e.target.closest('.page-player') && !e.target.closest('.page-content')){
        if(e.target.closest('.page__info')){
            let item = e.target.closest('.page').querySelector('.page-player');
            let stop = item.querySelector('.page-player__stop');
            stop?.dispatchEvent(new Event('click'));
        }
        else{
            document.querySelectorAll('.page-player').forEach(item=>{
                let canvas = item.querySelector('.page-player__circle');
                canvas?.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                let stop = item.querySelector('.page-player__stop');
                stop?.dispatchEvent(new Event('click'));
                item.classList.remove('active');
            })
        }
    }
})
function draw_video_lines(canvas, width,r, density, offset) {
        var _ctx = canvas.getContext('2d'),
        _radius = r,
        _angle = void 0,
        _tic = 4,
    _tic_interval = 1;

    var lines = function lines(i) {
        _angle = (i - 3) * (Math.PI * 2) / density; // частота линий
        _ctx.lineWidth = width;
        _ctx.beginPath();

        var x1 = canvas.width / 2 + Math.cos(_angle) * _radius;
        var y1 = canvas.height / 2 + Math.sin(_angle) * _radius;
        var x2 = canvas.width / 2 + Math.cos(_angle) * offset; // штрих
        var y2 = canvas.height / 2 + Math.sin(_angle) * offset;

        _ctx.moveTo(x1, y1);
        _ctx.lineTo(x2, y2);

        _ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        _ctx.stroke();
    };

    // Очищаем контекст и рисуем
    _ctx.clearRect(0, 0, canvas.width, canvas.height);

    // for (_tic; _tic <= 364; _tic++) {
    //     lines(_tic);
    // }

    // Если надо отрисовать не сразу, а по очереди
    const lines_int = setInterval(() => {
        lines(_tic);
        _tic++;
        if (_tic >= 364 ) {
            clearInterval(lines_int)
        }
    }, _tic_interval);
};
