const MedList = require("../models/Medlist");
const fetch = require("node-fetch");

module.exports = {
    getEdit: async (req, res) => {
        const id = req.params.id;

        try {
            const med = await MedList.findById(id);
            // const meds = await MedList.find({ user: req.user._id });
            
            if (!med) {
            req.flash("error", "Medicine not found");
            return res.redirect("/profile");
            }

            res.render("edit.ejs", { 
                user: req.user,
                // medList: meds, 
                // idMed: id, 
                med, 
                errorMessages: req.flash("error") });
        } catch (err) {
            console.error(err);
            req.flash("error", "An error occurred while fetching medicine");
            return res.redirect("/profile");
        }
    },
    deleteMed: async (req, res) => {
        const id = req.params.id;
        try {
            const result = await MedList.findByIdAndDelete(id);
            res.redirect("back");
        } catch (err) {
            if (err) return res.status(500).send(err);
        }
    },
    updateMed: async (req, res) => {
        const { id } = req.params;
        const { name, notes } = req.body;
        
        try {
            const existingMed = await MedList.findOne( { name, user: req.user._id, _id: { $ne: id } } );
            if (existingMed) {
                // && existingMed._id.toString() !== id
                
                // req.flash("error", "This medicine is already on your list.");
                // const  medlist = await MedList.find({ user: req.user._id });
                // return res.render("edit", { 
                //     user: req.user,
                //     medList: medlist, 
                //     idMed: id, 
                //     errorMessages: req.flash("error"),
                //     // name: name, 
                //     // notes: notes  
                // });
                req.flash("error", "This medicine is already on your list.");
            const medlist = await MedList.find({ user: req.user._id });
            return res.render("edit", { 
                user: req.user,
                medList: medlist, 
                idMed: id, 
                errorMessages: req.flash("error"),
                });
            }

            let rxcui = existingMed ? existingMed.rxcui : null;
            if (!existingMed) {
                const response = await fetch(
                    `https://rxnav.nlm.nih.gov/REST/Prescribe/rxcui.json?name=${name}`
                );
                const data = await response.json();

                if (!data.idGroup || !data.idGroup.rxnormId || data.idGroup.rxnormId.length === 0) {
                    req.flash("error", "Invalid or misspelled medicine name. Please ensure correct spelling.");
                    const  medlist = await MedList.find();
                    return res.render("edit", { 
                        user: req.user,
                        medList: medlist, 
                        idMed: id, 
                        errorMessages: req.flash("error"),
                        // name: name, 
                        // notes: notes    
                    });
                }

                rxcui = data.idGroup.rxnormId[0];
            }
            
            const updateMed = {
                name, 
                notes,
                rxcui
            };

            await MedList.findByIdAndUpdate(id, updateMed);

            req.flash("success", "Medicine updated successfully!");
            return res.redirect("/profile");
        } catch (err) {
            console.log(err);
            // req.flash("error", "An error occurred while updating medicine");
            const medlist = await MedList.find();
            return res.render("edit", { 
                user: req.user,
                medList: medlist, 
                idMed: id, 
                errorMessages: req.flash("error"),
                // name: name, 
                // notes: notes  
            });
    }   
    }
}