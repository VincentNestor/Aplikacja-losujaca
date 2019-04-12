const div = document.querySelector('div.load');
const btn = document.querySelector('button.spin');
const colorBtn = document.querySelectorAll('[data-color]');
const colorSet = document.querySelector('aside h4 span');
let inputBid = document.getElementById('bid');
const spanAmount = document.querySelector('.amount');
const spanWin = document.querySelector('.win');
const spanLose = document.querySelector('.lose');
const spanMoney = document.querySelector('.money');
const p = document.querySelector('.pCont p');
const divTransparent = document.querySelector('.transparent');
let drawnColor = '';
let choosenColor = '';
const transparentResult = document.querySelector('.transparentResult');

const spans = [...document.querySelectorAll('span')];
const spnPurple = document.querySelector('.glowing span:nth-child(1)');
const spnGreen = document.querySelector('.glowing span:nth-child(2)');
spans.forEach(span => span.addEventListener('click', e => {
    spnGreen.classList.remove('Blue');
    spnPurple.classList.remove('Purple');
    choosenColor = e.target.textContent;
    e.target.classList.add(choosenColor);
    if (choosenColor == "Purple") colorSet.textContent = "Fioletowy";
    else if (choosenColor == "Blue") colorSet.textContent = "Niebieski";
}))

class Statistics {
    constructor() {
        this.game = [];
    }
    Stats() {
        let amount = this.game.length;
        let win = this.game.filter(win => win.win).length;
        let lose = this.game.filter(win => !win.win).length;

        spanWin.textContent = win;
        spanLose.textContent = lose;
        spanAmount.textContent = amount;

        return [amount, win, lose]
    }
    showWinTransparent(win) {
        inputBid = document.getElementById('bid');
        let winMoney = inputBid.value * 3;
        let loseMoney = inputBid.value;
        setTimeout(() => {
            spnGreen.classList.remove('Blue');
            spnPurple.classList.remove('Purple');
            inputBid.value = "";
            colorSet.textContent = "";
            choosenColor = "";
            transparentResult.textContent = win ? `Wygrałeś ${winMoney} $` : `Przegrałeś ${loseMoney} $`;
            transparentResult.classList.add('active');
        }, 1000)
        setTimeout(() => {
            transparentResult.classList.remove('active');
        }, 3000)

    }
    WinOrLose(win) {
        let gameResult = {
            win: win
        }
        this.game.push(gameResult)
        if (win) {
            this.showWinTransparent(win)
        } else {
            this.showWinTransparent(win)
        }
    }
}
let statistics = new Statistics();
class Money {
    constructor() {
        this.money = 200;
        this.getWalletValue = () => this.money;

    }

    Result(bid, win) {
        bid = Math.floor(bid)
        if (win) this.money += (bid * 3);
        else this.money -= bid;

        spanMoney.textContent = this.money;

    }
}

let money = new Money();

colorBtn.forEach(item => item.addEventListener('click', e => {
    colorSet.textContent = e.target.textContent;
}))
let nbRandom = "";
let time = 3000;

btn.addEventListener("click", function () {
    if (!inputBid.value) return alert("Podaj stawkę")
    else if (!choosenColor) return alert("Wybierz kolor")
    if (Math.floor(spanMoney.textContent) < Math.floor(inputBid.value)) return alert("Nie masz środków na koncie");

    nbRandom = Math.floor(Math.random() * 30000);
    div.style.transition = `${time}ms ease`;
    div.style.transform = `rotate(${nbRandom}deg)`;

    setTimeout(rotate, time)
});

const rotate = () => {
    let result = nbRandom % 360;
    if (result <= 180) drawnColor = "Niebieski";
    else if (result <= 360) drawnColor = "Fioletowy";

    statsInfo()

}
statsInfo = () => {
    inputBid = document.getElementById('bid');
    if (drawnColor === colorSet.textContent) statistics.WinOrLose(true), money.Result(inputBid.value, true);
    else statistics.WinOrLose(false), money.Result(inputBid.value, false);

    statistics.Stats()





}