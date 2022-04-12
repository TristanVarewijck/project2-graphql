var yearButtons = document.getElementsByClassName("yearButton");


for (let i = 0; i < yearButtons.length; i++) {

    yearButtons[i].addEventListener("click", getYear);

    function getYear() {
        document.querySelector("#jaren").style.display = "block";
        console.log(yearButtons[i].value);

        var year = yearButtons[i].value;
        var element = document.querySelector("#year" + yearButtons[i].value + "")
        var containers = document.getElementsByClassName("yearContainer")

        for (let i = 0; i < containers.length; i++) {
            containers[i].classList.remove("openAnimation");
            containers[i].style.display = "none";
        }

        element.style.display = "block";
        element.classList.toggle("openAnimation");
    }

    var closeButtons = document.getElementsByClassName("closeButton");

    for (let i = 0; i < closeButtons.length; i++) {

        closeButtons[i].addEventListener("click", closeContainer);

        function closeContainer() {
            var closing = closeButtons[i].parentElement;
            closing.classList.toggle("openAnimation");
            closing.classList.toggle("closeAnimation");
        }
    };
}

export function tijdlijn() {};
