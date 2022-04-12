var yearButtons = document.getElementsByClassName("yearButton");


for (let i = 0; i < yearButtons.length; i++) {

    yearButtons[i].addEventListener("click", getYear);

    function getYear() {
        console.log(yearButtons[i].value);
    }


}
export function tijdlijn() {

};
