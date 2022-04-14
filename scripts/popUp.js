const popUp = document.getElementById("pop-up");
const popUpToggler = document.getElementById("toggleButton");
const buttonIcon = document.getElementById("buttonIcon");
// toggle between 2 classes
popUpToggler.addEventListener("click", () => {
    popUp.classList.toggle("hidePopUp");
});

export {
    popUpToggler
};


document.querySelector("#toggleButton").addEventListener("click", testFunction);

function testFunction() {
    document.querySelector("#toggleButton").classList.toggle("pressed");
}



var timeLimeBtns = document.getElementsByClassName("timeLimeBtn");


for (let i = 0; i < timeLimeBtns.length; i++) {


    timeLimeBtns[i].addEventListener("click", testFunction2);

    function testFunction2() {

        var label = document.querySelector(".poep");
        if (typeof (label) != 'undefined' && label != null) {
            document.querySelector("label").remove();
        }

        const para = document.createElement("label");
        para.className = "poep";
        para.innerText = timeLimeBtns[i].value;

        timeLimeBtns[i].appendChild(para);

        document.getElementById("pop-up").classList.add("hidePopUp");
        document.querySelector("#toggleButton").style.display = "block";
        document.querySelector("#toggleButton").classList.add("pressed");
    }

}