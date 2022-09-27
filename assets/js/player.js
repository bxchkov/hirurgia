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
    let inner = item.querySelector('.page-player__inner');
    // api для скрытия hide UI
    let timeouthideUI;
    function startTimeoutUI(){
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
        startTimeoutUI();
    }
    // медленное раскрытие при наведении мышкой
    item.addEventListener('mouseover',e=>{
        if(e.path[0].classList.contains('page-player') && !e.path[0].classList.contains('active')){
            item.classList.add('hover');
            timeOut = setTimeout(()=>{
                //play.dispatchEvent(new Event('click'));
                drawCircle(canvas);
                item.classList.add('active');
                document.querySelector('.body').classList.add('video-opened');
                refreshTimeoutUI()
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
            document.querySelector('.body').classList.add('video-opened');
            //fix css bug :)
            function windowFullOpened(e){
                if(!item.classList.contains('active'))
                    return;
                startTimeoutUI()
                item.classList.remove('on-transition');
                play.dispatchEvent(new Event('click'));
                if(canvas)
                    drawCircle(canvas);
                // let itsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                // if(itsMobile){
                //     video.requestFullscreen();
                // }
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
        trackTime.style.animationName = "time-around";
        trackTime.style.animationDuration = video.duration+"s";
        trackTime.style.animationTimingFunction = "linear";
        trackTime.style.animationPlayState = "running";
        videoInterval = setInterval(()=>{
            trackTime.innerHTML = Math.floor(video.currentTime / 60) +':'+ (video.currentTime % 60 < 10 ? '0':'') + Math.floor(video.currentTime % 60);
        },1000);
    })
    // при паузе останавливаем движение точки
    video.addEventListener('pause',e=>{
        clearInterval(videoInterval);
        trackMark.style.animationPlayState = "paused";
        trackTime.style.animationPlayState = "paused";
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
    document.addEventListener("fullscreenchange",e=>{
        if(!document.fullscreenElement){
            close.dispatchEvent(new Event('click'));
        }
    })
    // закрытие видоса
    close.addEventListener('click',e=>{
        item.classList.remove('active');
        stop.dispatchEvent(new Event('click'));
        removeTimeoutUI()
        item.classList.remove('hideUI');
        e.stopPropagation();
        document.querySelector('.body').classList.remove('video-opened');
    })
    // обработчики управления временем видео PC
    trackTime.addEventListener('mousedown',e=>{
        video.pause();
        trackMark.style.animationPlayState = "paused";
        trackTime.style.animationPlayState = "paused";
        let degrees;
        removeTimeoutUI();
        function mouseMove(e){
            UIwrapper.classList.add('active');
            let y = (window.innerHeight / 2 - e.y);
            let x =(e.x - window.innerWidth / 2);
            let radian = Math.atan2(x,y);
            degrees = (radian / Math.PI * 180);
            degrees = degrees >0 ?degrees:degrees+360;
            degrees = degrees % 360;
            let videoTime =  video.duration * degrees / 360;
            trackTime.innerHTML = Math.floor(videoTime / 60) +':'+ (videoTime % 60 < 10 ? '0':'') + Math.floor(videoTime % 60);
            video.currentTime = video.duration * degrees / 360;
            trackMark.style.transform = `rotateZ(${degrees}deg)`;
            trackTime.style.transform = `rotateZ(${-degrees}deg)`;
        }
        document.addEventListener('mousemove',mouseMove)
        function mouseUp(e){
            if(!e.target.closest('.page-player__UI'))
                setTimeout(()=>{UIwrapper.classList.remove('active')},750)
            startTimeoutUI();
            video.currentTime = video.duration * degrees / 360;
            video.play();
            trackMark.style.animationDuration = "";
            trackMark.style.animationName= "";
            trackTime.style.animationDuration = "";
            trackTime.style.animationName = "";
            // фиксим баг хрома
            setTimeout(()=>{
                trackMark.style.animationName= "track-around";
                trackMark.style.animationDuration = Math.round((video.duration - video.currentTime) * 100) / 100 +"s";
                trackMark.style.animationPlayState = "running";
                trackTime.style.animationName= "time-around";
                trackTime.style.animationDuration = Math.round((video.duration - video.currentTime) * 100) / 100 +"s";
                trackTime.style.animationPlayState = "running";
            },1)
            document.removeEventListener('mousemove',mouseMove)
            document.removeEventListener('mouseup',mouseUp);
        }
        document.addEventListener('mouseup',mouseUp);
    })
    // обработчики управления временем видео
    trackTime.addEventListener('touchstart',e=>{
        video.pause();
        trackMark.style.animationPlayState = "paused";
        let degrees;
        function mouseMove(e){
            UIwrapper.classList.add('active');
            let y = (window.innerHeight / 2 - e.touches[0].pageY);
            let x =(e.touches[0].pageX - window.innerWidth / 2);
            let radian = Math.atan2(x,y);
            degrees = (radian / Math.PI * 180);
            degrees = degrees >0 ?degrees:degrees+360;
            if(window.innerWidth < window.innerHeight  && window.innerWidth <= 600) {
                degrees += 270;
            }
            degrees = degrees % 360;
            let videoTime =  video.duration * degrees / 360;
            trackTime.innerHTML = Math.floor(videoTime / 60) +':'+ (videoTime % 60 < 10 ? '0':'') + Math.floor(videoTime % 60);
            video.currentTime = parseFloat(video.duration * degrees / 360);
            trackMark.style.transform = `rotateZ(${degrees}deg)`;
            trackTime.style.transform = `rotateZ(${-degrees}deg)`;
            removeTimeoutUI();
            e.stopPropagation();
            e.preventDefault();
        }
        document.addEventListener('touchmove',mouseMove, { passive: false })
        function mouseUp(e){
            if(!e.target.closest('.page-player__UI'))
                setTimeout(()=>{UIwrapper.classList.remove('active')},750)
            startTimeoutUI();
            video.currentTime = parseFloat(video.duration * degrees / 360);
            video.play();
            trackMark.style.animationDuration = "";
            trackMark.style.animationName= "";
            trackTime.style.animationDuration = "";
            trackTime.style.animationName = "";
            // фиксим баг хрома
            setTimeout(()=>{
                trackMark.style.animationName= "track-around";
                trackMark.style.animationDuration = Math.round((video.duration - video.currentTime) * 100) / 100 +"s";
                trackMark.style.animationPlayState = "running";
                trackTime.style.animationName= "time-around";
                trackTime.style.animationDuration = Math.round((video.duration - video.currentTime) * 100) / 100 +"s";
                trackTime.style.animationPlayState = "running";
            },1)
            document.removeEventListener('touchmove',mouseMove)
            document.removeEventListener('touchend',mouseUp);
            document.removeEventListener('scroll',scroll)
            e.stopPropagation();
        }
        document.addEventListener('touchend',mouseUp);
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
        let itsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(itsMobile)
            return;
        item.classList.remove('hideUI');
        refreshTimeoutUI()
    });
    play.addEventListener('mouseover',()=>{
        removeTimeoutUI()
        UIwrapper.classList.add('active');
    });
    play.addEventListener('mouseout',refreshTimeoutUI);
    play.addEventListener('click',refreshTimeoutUI);
    UIwrapper.addEventListener('mouseover',()=>{
        removeTimeoutUI();
        UIwrapper.classList.add('active');
    });
    UIwrapper.addEventListener('click',refreshTimeoutUI)
    UIwrapper.addEventListener('mouseout',()=>{
        refreshTimeoutUI();
        UIwrapper.classList.remove('active');
    });
    stop.addEventListener('mouseover',()=>{
        removeTimeoutUI()
        UIwrapper.classList.add('active');
    });
    stop.addEventListener('click',refreshTimeoutUI);
    stop.addEventListener('mouseout',refreshTimeoutUI);
})
document.addEventListener('click',e=>{
    if(!e.target.closest('.page-player') && !e.target.closest('.page-content') && !e.target.closest('[data-action="toggle-audio"]') && !e.target.closest('[data-action="toggle-fullscreen"]')){
        if(e.target.closest('.page__info')){
            let item = e.target.closest('.page').querySelector('.page-player');
            let stop = item.querySelector('.page-player__stop');
            stop?.dispatchEvent(new Event('click'));
        }
        else{
            document.querySelectorAll('.page-player').forEach(item=>{
                item.querySelector('.page-player__close').dispatchEvent(new Event('click'));
            })
        }
    }
})
function drawCircle(canvas){
    console.log((window.innerWidth < window.innerHeight && window.innerWidth < 650) || (window.innerWidth > window.innerHeight && window.innerHeight < 650));
    if((window.innerWidth < window.innerHeight && window.innerWidth < 650) || (window.innerWidth > window.innerHeight && window.innerHeight < 650))
        draw_video_lines(canvas, 4,180,25);
    else
        draw_video_lines(canvas, 2,360,15);
}
document.querySelectorAll('.page-player__circle-small').forEach(canvas=>{
    draw_video_lines(canvas, 2,180,10,0);
})
function draw_video_lines(canvas, width,count,line,intervalTic = 4) {
    var _ctx = canvas.getContext('2d'),
    radiusX = canvas.width / 2,
    radiusY = canvas.height / 2;
    _ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    const lines_int = setInterval(() => {
        let angle = (360 / count * i); // частота линий
        let radian = Math.PI * 2 / 360 * angle;
        _ctx.lineWidth = width;
        _ctx.beginPath();
        var x1 = canvas.width / 2 + Math.cos(radian) * (radiusX - line);
        var y1 = canvas.height / 2 + Math.sin(radian) * (radiusY - line);
        var x2 = canvas.width / 2 + Math.cos(radian) * radiusX; // штрих
        var y2 = canvas.height / 2 + Math.sin(radian) * radiusY;
        _ctx.moveTo(x1, y1);
        _ctx.lineTo(x2, y2);

        _ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
        _ctx.stroke();
        i++;
        if (i >= count) {
            clearInterval(lines_int)
        }
    }, intervalTic);
};
document.addEventListener('click',e=>{
    if(e.target.closest('[data-action="toggle-audio"]')){
        e.target.closest('[data-action="toggle-audio"]').classList.toggle('active');
        document.querySelectorAll(".page-player__video").forEach(video=>{
            video.muted = e.target.closest('[data-action="toggle-audio"]').classList.contains('active');
        })
        e.preventDefault();
        e.stopPropagation()
    }
    else if(e.target.closest('[data-action="toggle-fullscreen"]')){
        document.querySelector('.main').style.transition = "none";
        toggleFullScreen(document.querySelector('.body'));

        setTimeout(()=>{
            document.querySelector('.main').style.transition = "";
        },10)
    }
})
function toggleFullScreen(elem) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}