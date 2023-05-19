const MedList = require("../models/medlist");
const fetch = require("node-fetch");

module.exports = {
    getIndex: async (req, res) => {
        try {
            const meds = await MedList.find();
            const input = req.flash("input")[0]; // Get the input value from flash messages
            const notes = req.flash("notes")[0]; // Get the notes value from flash messages
    
            res.render("index.ejs", {
              medList: meds,
              input: input,
              notes: notes,
              errorMessages: req.flash("error"),
              successMessages: req.flash("success")
            });
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    addMed: async (req, res) => {
    const input = req.body.name;
    const notes = req.body.notes;

    try {
      const existingMed = await MedList.findOne({ name: { $regex: new RegExp(`^${input}$`, 'i') } });
      if (existingMed) {
        req.flash("error", "This medicine is already on your list. You may edit it below.");
        req.flash("input", existingMed.name); // Use the existing medicine name from the database
        req.flash("notes", notes);
        return res.redirect("/");
      } else if (!input) {
        req.flash("error", "Please enter a medicine name.");
        req.flash("input", input);
        req.flash("notes", notes);
        return res.redirect("/");
      }

      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`
      );
      const data = await response.json();
      if (
        !data.idGroup ||
        !data.idGroup.rxnormId ||
        data.idGroup.rxnormId.length === 0
      ) {
        req.flash("error", "Invalid medicine name. Please ensure correct spelling.");
        req.flash("input", input);
        req.flash("notes", notes);
        return res.redirect("/");
      }

      const rxcui = data.idGroup.rxnormId[0];
      const newMed = new MedList({
        name: input,
        notes: notes,
        rxcui: rxcui,
      });
      await newMed.save();
      console.log(newMed);
      req.flash("success", "Medicine added successfully!");
      return res.redirect("/");
    } catch (err) {
      console.error(err);
      req.flash("error", "An error occurred while adding medicine.");
      return res.redirect("/");
    }
  }
    // checkInteractions: async (req, res) => {
    //   console.log("Check Interactions method called");
    //   try {
    //     const meds = await MedList.find();
    //     const rxcuis = meds.map((med) => med.rxcui).join('+');
    //     const url = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxcuis}`;
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     res.render('interactions.ejs', { interactions: data });
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Internal Server Error');
    //   }
    // }         
}

