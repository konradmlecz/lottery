class Check {
    constructor() {
        this.humanChoice = [...document.querySelectorAll(".chosen")]
        this.computerChoice = [...document.querySelectorAll(".drawed")]
        this.hitted = []
        this.check = function () {
            for (let i = 0; i < 6; i++) {
                for (let u = 0; u < 6; u++) {
                    if (this.humanChoice[i].textContent == this.computerChoice[u].textContent) {
                        this.humanChoice[i].classList.add("hitted")
                        this.computerChoice[u].classList.add("hitted")
                        this.hitted.push(this.humanChoice[i].textContent)
                    }

                }
            }
        }
        this.check()
    }
    getHitted() {
        return this.hitted
    }
}
class NumbersDraw {
    constructor() {
        this.numbers = []
        this.genereteNumbers = () => {
            for (let i = 1; i < 50; i++) {
                this.numbers[i - 1] = i;
            }
        }
        this.genereteNumbers()
    }
    getDrawNumber() {
        const drawNumber = Number(this.numbers.splice(Math.floor(Math.random() * this.numbers.length), 1));
        return drawNumber;
    }
}

class Game {
    constructor() {
        this.sectionTop = document.querySelector("section.top");
        this.sectionCenter = document.querySelector("section.center");
        this.sectionBottom = document.querySelector("section.bottom");

        this.header = document.querySelector("header");
        this.buttons = document.querySelector(".buttons");
        this.main = document.querySelector("main");
        this.score = document.querySelector(".score");
        this.popUp = document.querySelector("div.popup p");
        this.resetBtn = document.querySelector(".popup i");
        this.resetBtn.addEventListener("click", this.reset)

        this.confirmChoiceHumanBtn = document.querySelector('[data-button="confirm"]')
        this.confirmChoiceHumanBtn.addEventListener("click", this.confirmChoiceHuman.bind(this))
        this.drawBtn = document.querySelector('[data-button="draw"]')
        this.drawBtn.addEventListener("click", this.draw.bind(this))
        this.choiceIndex = 0;
        this.drawFlag = true;
        this.ballsChoice;
        this.numbersDraw = new NumbersDraw();
        this.checkObj;

    }
    genereteBallsToChoice() {
        for (let i = 1; i < 50; i++) {
            const ball = document.createElement("div");
            ball.classList.add("ball");
            ball.textContent = i;
            this.sectionTop.appendChild(ball);
            ball.addEventListener("click", this.choiceHuman.bind(this))
        }
    }
    choiceHuman(e) {
        // this.choiceHumanArray.push(e.target.textContent)
        if (this.choiceIndex < 6) {
            if (e.target.classList.contains("chosen")) {
                e.target.classList.remove("chosen");
                this.choiceIndex--;
            } else {
                e.target.classList.add("chosen");
                this.choiceIndex++;
            }
        } else if (e.target.classList.contains("chosen")) {
            e.target.classList.remove("chosen");
            this.choiceIndex--;
        }


    }
    confirmChoiceHuman(e) {
        e.preventDefault();
        if (this.choiceIndex == 6) {
            this.ballsChoice = [...document.querySelectorAll(".chosen")]
            this.ballsChoice.forEach((element, i) => {
                this.sectionCenter.appendChild(element);
            });
        } else {
            alert("Wybierz 6 liczb!")
        }
    }
    draw() {
        if (this.drawFlag) {
            if (this.choiceIndex !== 6) return
            for (let y = 0; y < 6; y++) {
                const numberDraw = this.numbersDraw.getDrawNumber()
                const div = document.createElement("div");
                div.classList.add("ball");
                div.classList.add("drawed");
                div.textContent = numberDraw;
                this.sectionBottom.appendChild(div);
            }
        }
        this.drawFlag = false;
        this.check();
    }
    check() {
        this.checkObj = new Check();
        const that = this;
        setTimeout(function () {
            that.summary(that.checkObj.getHitted());
        }, 3000);
    }
    summary(hits) {
        this.header.classList.add("blur");
        this.buttons.classList.add("blur");
        this.main.classList.add("blur");
        this.score.style.display = "block";

        if (!(hits.length == 0)) {
            let num = "";
            for (let i = 0; i < hits.length; i++) {
                num += ` ${hits[i]}`;
            }
            this.popUp.textContent = `Trafiłeś numer(y): ${num}`;
        } else {
            this.popUp.textContent = `Nie trafiłeś żadnej liczby`;
        }

    }
    reset() {
        location.reload();
    }


}



const game = new Game()
game.genereteBallsToChoice()