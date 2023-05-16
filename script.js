document.querySelector("button").addEventListener("click", fetchFromNLM);




function fetchFromNLM() {
    const input = document.querySelector("input").value;
    console.log(input);
    fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`)
        .then(res => res.json())
        .then(data => {
            let rxcui = data.idGroup.rxnormId.join("")
            console.log(rxcui);
            getMedByR(rxcui);
        })
}

function getMedByR(rxcui) {
    fetch(`https://rxnav.nlm.nih.gov/REST/RxTerms/rxcui/${rxcui}/allinfo.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}