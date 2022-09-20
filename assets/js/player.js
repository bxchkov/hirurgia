document.querySelectorAll('.page-player').forEach(item=>{
    let timeOut;
    let video = item.querySelector('.page-player__video');
    let play = item.querySelector('.page-player__play');
    let stop = item.querySelector('.page-player__stop');
    let canvas = item.querySelector('.page-player__circle');
    let trackMark = item.querySelector('.page-player__track');
    let trackTime = item.querySelector('.page-player__time');
    let close = item.querySelector('.page-player__close');
    let UIwrapper = item.querySelector('.page-player__UI');
    // api для скрытия hide UI
    let timeouthideUI;
    function addTimeoutUI(){
        item.classList.remove('hideUI');
        timeouthideUI = setTimeout(()=>{
            item.classList.add('hideUI');
        },1500)
    }
    function removeTimeoutUI(){
        item.classList.remove('hideUI');
        if(timeouthideUI)
            clearTimeout(timeouthideUI)
    }
    function refreshTimeoutUI(){
        removeTimeoutUI();
        item.classList.remove('hideUI');
        addTimeoutUI();
    }
    // медленное раскрытие при наведении мышкой
    item.addEventListener('mouseover',e=>{
        if(e.path[0].classList.contains('page-player') && !e.path[0].classList.contains('active')){
            item.classList.add('hover');
            timeOut = setTimeout(()=>{
                //play.dispatchEvent(new Event('click'));
                draw_video_lines(canvas, 1, 360, 9);
                item.classList.add('active');
            },6000)
        }
    })
    item.addEventListener('mouseout',e=>{
        if(e.path[0].classList.contains('page-player')) {
            e.target.classList.remove('hover');
            clearTimeout(timeOut);
        }
    })
    //быстрое раскрытие при клике
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
    // при нажатии на иконоку плей стоп
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
    // при запуске видео запускаем движение точки
    let videoInterval;
    video.addEventListener('play',e=>{
        trackMark.style.animationName = "track-around";
        trackMark.style.animationDuration = video.duration+"s";
        trackMark.style.animationTimingFunction = "linear";
        trackMark.style.animationPlayState = "running";
        videoInterval = setInterval(()=>{
            trackTime.innerHTML = Math.floor(video.currentTime / 60) +':'+ (video.currentTime % 60 < 10 ? '0':'') + Math.floor(video.currentTime % 60);
        },1000);
    })
    // при паузе останавливаем движение точки
    video.addEventListener('pause',e=>{
        clearInterval(videoInterval);
        trackMark.style.animationPlayState = "paused";
    })
    // при конце останавливаем движение точки
    video.addEventListener('ended',e=>{
        clearInterval(videoInterval);
        item.classList.remove('active');
        stop.dispatchEvent(new Event('click'));
        trackMark.style.animationName = '';
        trackMark.style.transform = "";
        video.currentTime = 0;
    })
    // закрытие видоса
    close.addEventListener('click',e=>{
        item.classList.remove('active');
        stop.dispatchEvent(new Event('click'));
        removeTimeoutUI()
        item.classList.remove('hideUI');
        e.stopPropagation();
    })
    // обработчики управления временем видео
    trackTime.addEventListener('mousedown',e=>{
        video.pause();
        trackMark.style.animationPlayState = "paused";
        let degrees;
        function mouseMove(e){
            UIwrapper.classList.add('active');
            let y = (window.innerHeight / 2 - e.y);
            let x =(e.x - window.innerWidth / 2);
            let radian = Math.atan2(x,y);
            degrees = (radian / Math.PI * 180);
            degrees = degrees >0 ?degrees:degrees+360;
            let videoTime =  video.duration * degrees / 360;
            trackTime.innerHTML = Math.floor(videoTime / 60) +':'+ (videoTime % 60 < 10 ? '0':'') + Math.floor(videoTime % 60);
            video.currentTime = video.duration * degrees / 360;
            trackMark.style.transform = `rotateZ(${degrees}deg)`;
            removeTimeoutUI();
        }
        document.addEventListener('mousemove',mouseMove)
        function mouseUp(e){
            if(!e.target.closest('.page-player__UI'))
                setTimeout(()=>{UIwrapper.classList.remove('active')},750)
            addTimeoutUI();
            video.currentTime = video.duration * degrees / 360;
            video.play();
            trackMark.style.animationDuration = "";
            trackMark.style.animationName= "";
            // фиксим баг хрома
            setTimeout(()=>{
                trackMark.style.animationName= "track-around";
                trackMark.style.animationDuration = Math.round((video.duration - video.currentTime) * 100) / 100 +"s";
                trackMark.style.animationPlayState = "running";
            },1)
            document.removeEventListener('mousemove',mouseMove)
            document.removeEventListener('mouseup',mouseUp);
        }
        document.addEventListener('mouseup',mouseUp);
    })
    // действия при нажатии на видео
    video.addEventListener('click',e=>{
        if(!item.classList.contains('hideUI')) {
            if(play.classList.contains('active'))
                play.dispatchEvent(new Event('click'));
            else if(stop.classList.contains('active'))
                stop.dispatchEvent(new Event('click'));
        }
        refreshTimeoutUI();
    })
    video.addEventListener('mousemove',e=>{
        item.classList.remove('hideUI');
        refreshTimeoutUI()
    })
    play.addEventListener('mouseover',()=>{
        removeTimeoutUI()
        UIwrapper.classList.add('active');
    })
    play.addEventListener('mouseout',addTimeoutUI)
    UIwrapper.addEventListener('mouseover',()=>{
        removeTimeoutUI()
        UIwrapper.classList.add('active');
    })
    UIwrapper.addEventListener('mouseout',()=>{
        addTimeoutUI()
        UIwrapper.classList.remove('active');
    })
    stop.addEventListener('mouseover',()=>{
        removeTimeoutUI()
        UIwrapper.classList.add('active');
    })
    stop.addEventListener('mouseout',addTimeoutUI)
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
