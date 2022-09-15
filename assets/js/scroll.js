let content = document.querySelectorAll('.page-content__inner');
content.forEach(e=>{
    console.log(content);
    e.addEventListener('wheel', e=>{
        console.log(e.deltaY);
    });
});