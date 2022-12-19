document.querySelector('.toggle').onclick = function(){
    document.querySelector('.navigation-1').classList.toggle('active');
    document.querySelector('.main').classList.toggle('active');
}


function activeLink(){
    document.querySelectorAll('.navigation-1 li').forEach((item) =>
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}

document.querySelectorAll('.navigation-1 li').forEach((item)=>{
    item.addEventListener('mouseover',activeLink);
    item.addEventListener('click',activeLink);
});