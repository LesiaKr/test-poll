const header = document.querySelector('.header');
const headerBcg = document.querySelector('.header__bcg');
const container = document.querySelector(".container");
const form = document.forms['submit-to-google-sheet'];
const inputBtns = document.querySelectorAll('.wrapper-btn input');
const blockFirst = document.querySelector(".block-first");
const blocks = document.querySelectorAll(".block");
const btnNext = document.querySelector(".button__next");
const end = document.querySelector('.end');
const wrapperBtns = document.querySelectorAll('.wrapper-btn');

document.addEventListener('DOMContentLoaded', function () {
    headerBcg.classList.add('active');
});

wrapperBtns.forEach(wrap => {
    wrap.addEventListener('click', function (e) {
        inputBtns.forEach(input => {
            input.classList.remove('active');
        })
        let target = e.target
        target.classList.add('active');
       
        if (form.yes.classList.contains('active')) {
            form.answer1.value = form.yes.value;
            btnNext.classList.add('active');
        } else if (form.no.classList.contains('active')){
            form.answer1.value = form.no.value;
            btnNext.classList.add('active');
        }
        
        form.chooseNumber.forEach(number => {
            if (number.classList.contains('active')) {
                form.answer2.value = number.value;
                btnNext.classList.add('active');
           };
        })
    })
})

let counter = 1;

btnNext.addEventListener('click', function (e) { 
    counter++;
    btnNext.classList.remove('active');
    blocks.forEach(block => {
        if (counter == block.id) {
            e.preventDefault();
            blockFirst.classList.add('active');
            block.classList.toggle('active');

            let chooseBtn = document.querySelector('.wrapper-btn input.active').name;
            if (chooseBtn == 'no') {
                container.style.display = 'none';
                header.style.backgroundColor = '#191919';
                headerBcg.classList.add('not-active');
                end.style.display = 'flex';
            }
        } 
        else {
            block.classList.remove('active');
        }
        if (counter == 3 || counter == 4 || counter == 5) {
            const messageEle = document.querySelectorAll('.message');
            const counterEle = document.querySelectorAll('.counter');
            const maxLength = 1500;
            btnNext.classList.add('active');
            counterEle.forEach(counter => {
                counter.innerHTML = '0/' + maxLength;
            })
            
            messageEle.forEach(me => {
                me.addEventListener('input', function (e) {
                    const target = e.target;
                    const currentLength = target.value.length;
                    counterEle.forEach(counter => {
                        counter.innerHTML = currentLength + '/' + maxLength;
                    })
                });
            })
        }
        if (counter == 6) {
            header.style.backgroundColor=  '#191919';
            btnNext.style.display = 'none';
            container.style.display = 'none';
            end.style.display = 'flex';
            headerBcg.classList.add('not-active');
        }
    })
})

const scriptURL = 'https://script.google.com/macros/s/AKfycbwkbp4kR871njhNY2FNOCI9T-d5PF_--rSNY7vjqLWJ0O1qGtEofLPRWfh9a2gk_ts68A/exec';
form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
})
