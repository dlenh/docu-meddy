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
    // addMed: async (req, res) => {
    //     const input = req.body.textinput;
    //     fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             let rxcui = data.idGroup.rxnormId[0];
    //             console.log(rxcui);
    //             const newMed = new MedList({
    //                     name: req.body.textinput,
    //                     rxcui: rxcui
    //                 });
    //         })
    //     try {
    //         await newMed.save();
    //         console.log(newMed);
    //         res.redirect("/");
    //     } catch (err) {
    //         if (err) return res.status(500).send(err);
    //         res.redirect("/");
    //     }    
    // }
    // addMed: async (req, res) => {
    //     const input = req.body.textinput;
    //     try {
    //         const response = await fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`);
    //         const data = await response.json();

    //         if (data.idGroup && data.idGroup.rxnormId && data.idGroup.rxnormId.length > 0) {
    //             let rxcui = data.idGroup.rxnormId[0];
    //             const newMed = new MedList({
    //                 textinput: input,
    //                 rxcui: rxcui
    //             });
    //             newMed.save()
    //                 .then(() => {
    //                     req.flash("success_msg", "Medicine added to the list");
    //                     res.redirect("/");
    //                 })
    //                 .catch(err => {
    //                     req.flash("error_msg", "Invalid medicine. Please ensure correct spelling.");
    //                     res.redirect("/");
    //                 })    
    //         } else {
    //             req.flash("error_msg", "Invalid medicine. Please ensure correct spelling.");
    //             res.redirect("/");
    //         }



    //         // if (data.idGroup.rxnormId.length === 0) {
    //         //     throw new Error("Invalid name. Please ensure correct spelling of medicine.");
    //         // }

    //         // const rxcui = data.idGroup && data.idGroup.rxnormId && data.idGroup.rxnormId.length ? data.idGroup.rxnormId[0] : null;            
    //         // // if (!rxcui) {
    //         // //     req.flash("error", "Invalid medicine. Please ensure correct spelling.");
    //         // //     return res.redirect("back");
    //         // // }
    //         // const newMed = new MedList({
    //         //     textinput: input,
    //         //     rxcui: rxcui
    //         // });
    //         // await newMed.save();

    //         // res.redirect("/");
    //     } catch (err) {
    //         console.log(err);
    //         req.flash("error", err.message);
    //         res.redirect("/");
    //     }
    // }
    // addMed: async (req, res) => {
    //     const input = req.body.name;
    //     const notes = req.body.notes;
    //     const existingMed = await MedList.findOne({ name: input });
    //     if (existingMed) {
    //         req.flash("error", "This medicine is already on your list");
    //         return res.redirect("/");
    //     } else if (!input) {
    //         req.flash("error", "Please enter a medicine name");
    //         return res.redirect("/");
    //     } else {}
    //     try {
    //       const response = await fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`);
    //       const data = await response.json();
    //       if (!data.idGroup || !data.idGroup.rxnormId || !data.idGroup.rxnormId.length) {
    //         req.flash("error", "Invalid or misspelled medicine name");
    //         req.flash("input", input);
    //         req.flash("notes", notes);
    //         return res.redirect("/");
    //       }
    //       const rxcui = data.idGroup.rxnormId[0];
    //       const newMed = new MedList({
    //         name: input,
    //         notes: notes,
    //         rxcui: rxcui
    //       });
    //       await newMed.save();
    //       console.log(newMed);
    //       req.flash("success", "Medicine added successfully");
    //       return res.redirect("/");
    //     } catch (err) {
    //       console.error(err);
    //       req.flash("error", "An error occurred while adding medicine");
    //     //   req.flash("input", input);
    //     //   res.redirect("/");
    //       return res.redirect("/");
    //     }
    //   }      
    // addMed: async (req, res) => {
    //     const input = req.body.name;
    //     const notes = req.body.notes;
    //     const meds = await MedList.find();
      
    //     try {
    //       const existingMed = await MedList.findOne({ name: input });
    //       if (existingMed) {
    //         req.flash("error", "This medicine is already on your list");
    //         return res.redirect("/");
    //       } else if (!input) {
    //         req.flash("error", "Please enter a medicine name");
    //         return res.redirect("/");
    //       }
      
    //       const response = await fetch(`https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${input}`);
    //       const data = await response.json();
    //       if (!data.idGroup || !data.idGroup.rxnormId || !data.idGroup.rxnormId.length) {
    //         req.flash("error", "Invalid or misspelled medicine name");
    //         console.log("Error: Invalid or misspelled medicine name");
    //         console.log("Input:", input);
    //         console.log("Notes:", notes);
    //         res.render("index.ejs", {
    //           medList: meds, 
    //           input: input, 
    //           notes: notes,
    //           errorMessages: req.flash("error"),
    //           successMessages: req.flash("success")
    //         });
    //         return res.redirect("/");
    //       }
      
    //       const rxcui = data.idGroup.rxnormId[0];
    //       const newMed = new MedList({
    //         name: input,
    //         notes: notes,
    //         rxcui: rxcui
    //       });
    //       await newMed.save();
    //       console.log(newMed);
    //       req.flash("success", "Medicine added successfully");
    //       return res.redirect("/");
    //     } catch (err) {
    //       console.error(err);
    //       req.flash("error", "An error occurred while adding medicine");
    //       return res.redirect("/");
    //     }
    //   }
    addMed: async (req, res) => {
      const input = req.body.name;
      const notes = req.body.notes;
    
      try {
        const existingMed = await MedList.findOne({ name: input });
        if (existingMed) {
          req.flash("error", "This medicine is already on your list. You may edit it below.");
          req.flash("input", input);
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
}

