const express = require('express')
const router = express.Router()
const dataBase = require('nedb')
const db = new dataBase({ filename: 'server/database/database.db', autoload: true })


//-----------------------------------Routes--------------------------------------------//

router.get("/", async (req, res) => {
    try {
        db.find({}).exec(function (err, docs) {
            if (err) {
                return res.status(500).json({ message: "Error" + err });
            }
            res.send(docs);
        });
    } catch (error) {
        res.status(500).json({ message: "" + error });
    }
});

router.post('/', async (req, res) => {
    try {
        db.insert(req.body).exec(function (err, docs) {
            if (err) {
                return res.status(500).json({ message: "Error" + err });
            }
            res.json({ message: "Data inserted successfully" })
        })
    }
    catch (error) {
        res.status(500).json({ message: "" + error });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        db.findOne({ _id: req.params.id }).exec(function (err, docs) {
            if (err) {
                return res.status(500).json({ message: "Error" + err });
            }
            if (docs == null) {
                return res.json({ message: "No docs found in database with this id" })
            }
            else {
                db.update({ _id: req.params.id }, req.body, { upsert: false })
                return res.json({ message: "Data updated successfully" })
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: "" + error });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        await db.remove({ _id: req.params.id }, (err, removalStatus) => {
            if (err) {
                return res.status(500).json({ message: "Error" + err });
            }
            if (removalStatus == true) {
                return res.json({ message: "Data removed successfully" });
            } else {
                return res.status(500).json({
                    message: "Data with this ID does not exist, nothing was deleted",
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "" + error });
    }
});

module.exports = router