// ANIMATE RECTANGLE //
const rect = document.querySelector('#clickableRect');
rect.addEventListener('click', ()=>{
  rect.classList.toggle('clicked-rect');
})

// ANIMATE DONUT //
const outsideDonut = document.querySelector('#outsideDonut');
outsideDonut.addEventListener('mouseenter', ()=>{
    outsideDonut.setAttribute('r', '74');
});
outsideDonut.addEventListener('mouseleave',()=>{
    outsideDonut.setAttribute('r', '60');
});