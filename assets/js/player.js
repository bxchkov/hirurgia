document.querySelectorAll('.page-player').forEach(item=>{
    let timeOut;
    let video = item.querySelector('.page-player__video');
    let play = item.querySelector('.page-player__play');
    let stop = item.querySelector('.page-player__stop');
    let canvas = item.querySelector('.page-player__circle');
    let trackMark = item.querySelector('.page-player__track');
    let trackTime = item.querySelector('.page-player__time');
    let close = item.querySelector('.page-player__close');
    item.addEventListener('mouseover',e=>{
        if(e.path[0].classList.contains('page-player') && !e.path[0].classList.contains('active')){
            e.target.classList.add('hover');
            timeOut = setTimeout(()=>{
                //play.dispatchEvent(new Event('click'));
                draw_video_lines(canvas, 1, 360, 9);
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
            clearTimeout(timeOut);
            item.classList.remove('hover');
            //fix css bug :)
            function windowFullOpened(e){
                if(!item.classList.contains('active'))
                    return;
                item.classList.remove('on-transition');
                play.dispatchEvent(new Event('click'));
                if(canvas)
                    draw_video_lines(canvas, 1, 360, 9);
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
    video.addEventListener('click',e=>{
        console.log(play.classList.contains('active'),stop.classList.contains('active'))
        if(play.classList.contains('active'))
            play.dispatchEvent(new Event('click'));
        else if(stop.classList.contains('active'))
            stop.dispatchEvent(new Event('click'));

    })
    var videoWatcher;
    video.addEventListener('play',e=>{
        trackMark.style.animationName = "track-around";
        trackMark.style.animationDuration = video.duration+"s";
        trackMark.style.animationTimingFunction = "linear";
        trackMark.style.animationPlayState = "running";
        setInterval(()=>{
            trackTime.innerHTML = Math.floor(video.currentTime / 60) +':'+ (video.currentTime % 60 < 10 ? '0':'') + Math.floor(video.currentTime % 60);
        },1000);
    })
    video.addEventListener('pause',e=>{
        trackMark.style.animationPlayState = "paused";
    })
    video.addEventListener('ended',e=>{
        item.classList.remove('active');
        trackMark.style.animationName = '';
        video.currentTime = 0;
    })
    close.addEventListener('click',e=>{
        item.classList.remove('active');
        stop.dispatchEvent(new Event('click'));
        e.stopPropagation()
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
function draw_video_lines(canvas, width,density,line) {
    var _ctx = canvas.getContext('2d'),
    _radius = canvas.width / 2 - line,
    _angle = void 0,
    _tic = 4,
    _tic_interval = 4,
    offset = canvas.width / 2;
    console.log('test');
    var lines = function lines(i) {
        _angle = (i-3) * ((Math.PI * 2) / density); // частота линий
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
