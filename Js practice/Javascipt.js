let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX =  true;// playerX , player O
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];
const resetGame = () => {
    turnX =  true;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winColor");
    }
    msgContainer.classList.add("hide");
    count = 0;

}
const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const showWinner = (pos1Val) => {
    msg.innerText = `Congratulations, Winner is ${pos1Val}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    for(pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if(pos1Val !="" && pos2Val !="" && pos3Val !="" )
    {
       if(pos1Val === pos2Val && pos2Val === pos3Val) {
         boxes[pattern[0]].classList.add("winColor");
         boxes[pattern[1]].classList.add("winColor");
         boxes[pattern[2]].classList.add("winColor");
         showWinner(pos1Val);
         return true;
       }
    }
  }
   return false;
};
const checkDraw = (count) => {
    if(count === 9){
    msg.innerText = `Draw , Play Again!`;
    msgContainer.classList.remove("hide");
    }
}
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
         count++;
        if(turnX){
            // box.classList.add("colR");
            box.innerHTML = "<span class='colR'>X</span>";
            turnX = false;
            //  box.classList.remove("col1");
        }
        else{
            // box.classList.add("colB");
            box.innerHTML = "<span class='colB'>O</span>";
            turnX = true;
        }
        box.disabled = true;
        const check = checkWinner();
        if(!check){
        checkDraw(count);
        }
    });
});
newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
