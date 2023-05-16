const MedList = require("../models/medlist");

module.exports = {
    getEdit: async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            const meds = await MedList.find();
            res.render("edit.ejs", {medList: meds, idMed: id});
        } catch (err) {
            if (err) return res.status(500).send(err);
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
        const id = req.params.id;
        try {
            await MedList.findByIdAndUpdate(
                id,
                {
                    name: req.body.name,
                    notes: req.body.notes
                }
            );
            res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
        }
    }
}