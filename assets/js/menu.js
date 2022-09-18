
document.addEventListener('click',e=>{
    if(document.body.classList.contains('right-open') && !e.target.closest('.body-right')){
        document.querySelectorAll('.body-right > *').forEach(item=>{
            item.classList.remove('active');
        });
        document.body.classList.remove('right-open');
    }
})
document.addEventListener('click',e=>{
    let btn = e.target.closest('[js-right-action]');
    if(btn === null)
        return;
    let action = btn.getAttribute('js-right-action');
    let targetSelector = btn.getAttribute('js-right-target');
    let target = document.querySelector('.body-right > ' + targetSelector);
    if(target === null && action === 'open')
        return
    document.querySelectorAll('.body-right > *').forEach(item=>{
        item.classList.remove('active');
    })
    switch (action){
        case 'open':
            target.classList.add('active');
            document.body.classList.add('right-open');
            break;
        case 'close':
            document.body.classList.remove('right-open');
            break;
        case 'toggle':
            document.body.classList.toggle('right-open');
            break;
    }
})