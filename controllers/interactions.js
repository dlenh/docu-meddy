const MedList = require("../models/medlist");
const fetch = require("node-fetch");

module.exports = {
    checkInteractions: async (req, res) => {
        try {
            const meds = await MedList.find();

            const rxcuis = meds.map(med => med.rxcui);

            const rxcuisString = rxcuis.join("+");

            const url = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuisString}`
            
            const response = await fetch(url);
            const data = await response.json();

            res.render("interactionResult", { interactions: data}); 
        } catch (err) {
            console.log(err);
            res.status(500).send("An error occurred while checking drug interactions.");
        }
    }
}