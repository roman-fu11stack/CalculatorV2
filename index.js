const currentInput = document.querySelector('.current-input')
const numBtn = document.querySelectorAll('.num-btn')
const operatorBtn = document.querySelector('.operator-btn')


numBtn.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.textContent;
        currentInput.textContent += number
    })
});
