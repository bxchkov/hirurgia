let pages = document.querySelector('.page');
pages.addEventListener('scroll',e=> {
    fix.textContent = this.oldScroll > this.scrollY ?
        'ВВЕРХ' : 'ВНИЗ';
    this.oldScroll = this.scrollY;
});