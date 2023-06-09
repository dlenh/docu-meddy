const MedList = require("../models/Medlist");
const fetch = require("node-fetch");

module.exports = {
    getIndex: (req, res) => {
      res.render("index.ejs");
    },
    getProfile: async (req, res) => {
        try {
            const meds = await MedList.find({ user: req.user.id });
            const input = req.flash("input")[0]; // Get the input value from flash messages
            const notes = req.flash("notes")[0]; // Get the notes value from flash messages
    
            res.render("profile.ejs", {
              user: req.user,
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
        const existingMed = await MedList.findOne({ name: { $regex: new RegExp(`^${input}$`, 'i') }, user: req.user._id });
        if (existingMed) {
          req.flash("error", "This medicine is already on your list. You may edit it below.");
          req.flash("input", existingMed.name); // Use the existing medicine name from the database
          req.flash("notes", notes);
          return res.redirect("/profile");
        } else if (!input) {
          req.flash("error", "Please enter a medicine name.");
          req.flash("input", input);
          req.flash("notes", notes);
          return res.redirect("/profile");
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
          return res.redirect("/profile");
        }
  
        const rxcui = data.idGroup.rxnormId[0];
        const newMed = new MedList({
          name: input,
          notes: notes,
          rxcui: rxcui,
          user: req.user._id,
        });
        await newMed.save();
        console.log(newMed);
        req.flash("success", "Medicine added successfully!");
        return res.redirect("/profile");
      } catch (err) {
        console.error(err);
        req.flash("error", "An error occurred while adding medicine.");
        return res.redirect("/profile");
      }
    }
  //   addMed: async (req, res) => {
  //     const input = req.body.name.toLowerCase();
  //     const notes = req.body.notes;
  //     const  medlist = await MedList.find();

  //     try {
  //       const existingMed = await MedList.findOne({ name: { $regex: new RegExp(`^${input}$`, 'i') } });
  //       if (existingMed) {
  //         req.flash("error", "This medicine is already on your list. You may edit it below.");
  //         req.flash("input", existingMed.name); // Use the existing medicine name from the database
  //         req.flash("notes", notes);
  //         return res.redirect("/");
  //       } else if (!input) {
  //         req.flash("error", "Please enter a medicine name.");
  //         req.flash("input", input);
  //         req.flash("notes", notes);
  //         return res.redirect("/");
  //       }

  //       const response = await fetch(
  //         `https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`
  //       );
  //       const data = await response.json();
  //       if (
  //         !data.idGroup ||
  //         !data.idGroup.rxnormId ||
  //         data.idGroup.rxnormId.length === 0
  //       ) {
  //         req.flash("error", "Invalid medicine name. Please ensure correct spelling.");
  //         req.flash("input", input);
  //         req.flash("notes", notes);
  //         return res.redirect("/");
  //       }

  //       const rxcui = data.idGroup.rxnormId[0];
  //       const newMed = new MedList({
  //         name: input,
  //         notes: notes,
  //         rxcui: rxcui,
  //       });

  //       // const alternativeNamesResponse = await fetch(
  //       //   `https://rxnav.nlm.nih.gov/REST/ApproximateTerm?term=${input}&maxEntries=10`
  //       // );
  //       // const alternativeNamesData = await alternativeNamesResponse.json();
  //       // const alternativeNames = alternativeNamesData.approximateGroup?.[0]?.candidate?.map(
  //       //   candidate => candidate.rxcuiName
  //       // );

        
  //       req.flash("success", "Medicine added successfully!");
  //       await newMed.save();
  //       console.log(newMed);
        
  //       return res.render("index.ejs", {
  //         medList: [...medlist, newMed],
  //         input: input,
  //         notes: notes,
  //         errorMessages: req.flash("error"),
  //         // alternativeNames: alternativeNames,
  //         successMessages: req.flash("success"),
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       req.flash("error", "An error occurred while adding medicine.");
  //       return res.redirect("/");
  //     }
  // }
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

