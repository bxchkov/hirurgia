
document.addEventListener('click',e=>{
    if(document.querySelector('.body').classList.contains('right-open') && !e.target.closest('.body-right')){
        document.querySelectorAll('.body-right > *').forEach(item=>{
            item.classList.remove('active');
        });
        document.querySelector('.body').classList.remove('right-open');
        document.querySelector('.body-left').style.transform = '';
    }
})
document.addEventListener('click',e=>{
    let btn = e.target.closest('[data-right-action]');
    if(btn === null)
        return;
    let action = btn.getAttribute('data-right-action');
    let targetSelector = btn.getAttribute('data-right-target');
    let target = document.querySelector('.body-right > ' + targetSelector);
    if(target === null && action === 'open')
        return
    document.querySelectorAll('.body-right > *').forEach(item=>{
        item.classList.remove('active');
    })
    document.querySelector('.body-left').style.transform = '';
    switch (action){
        case 'open':
            target.classList.add('active');
            document.querySelector('.body').classList.add('right-open');
            if(!((window.innerHeight < window.innerWidth && window.innerWidth <= 1100) || (window.innerHeight > window.innerWidth && window.innerHeight <= 1100))){
                console.log(Math.acos(1 - (target.clientWidth) / window.innerWidth));
                document.querySelector('.body-left').style.transform = `rotateY(${Math.acos(1 - (target.clientWidth) / window.innerWidth)  * 180 / Math.PI  * 1.275 -  window.innerWidth * 0.01}deg)`;
            }else{
                document.querySelector('.body-left').style.transform = '';
            }
            break;
        case 'close':
            document.querySelector('.body').classList.remove('right-open');
            break;
        case 'toggle':
            document.querySelector('.body').classList.toggle('right-open');
            break;
    }
})
window.addEventListener('resize',e=>{
    console.log(e);
    if(!((window.innerHeight < window.innerWidth && window.innerWidth <= 1100) || (window.innerHeight > window.innerWidth && window.innerHeight <= 1100)) && document.querySelector('.body').classList.contains('right-open')){
        let target = document.querySelector('.body-right > *.active');
        document.querySelector('.body-left').style.transform = `rotateY(${Math.acos(1 - (target.clientWidth) / window.innerWidth)  * 180 / Math.PI  * 1.275 -  window.innerWidth * 0.01}deg)`;
    }else{
        document.querySelector('.body-left').style.transform = '';
    }
})