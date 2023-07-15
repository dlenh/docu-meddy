const MedList = require("../models/Medlist");
const fetch = require("node-fetch");

module.exports = {
    checkInteraction: async (req, res) => {
        const { id } = req.params;
        const { name, notes } = req.body;
        const input = req.body.name;
        try {
            const medList = await MedList.find({}, "rxcui");
            const rxcuiString = medList.map(med => med.rxcui).join("+");
            const meds = await MedList.find();
            const response = await fetch(
                `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuiString}`
            );
            console.log(rxcuiString)
            const data = await response.json();
            console.log(data);
            return res.render("interaction.ejs", {
                interactionResult: data,
                medList: meds,
                input: input,
                notes: notes,
                errorMessages: req.flash("error"),
                successMessages: req.flash("success")
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "An error occurred while checking interactions." });
        }
    }
}