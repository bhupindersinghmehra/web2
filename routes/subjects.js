const db = require('../makedatabase').Subject
const route = require('express').Router()
const teacher = require('../makedatabase').Teacher
route.route("/").get((req, res) => {
    
    db.findAll({}).then(result => res.json(result))
        .catch(errror => {
            res.status(412).json({ msg: error.message });
        });
})
    .post((req, res) => {
            db.create(req.body).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    });


route.route("/:id").get((req, res) => {
    

    db.findOne({ where: { subjectid: req.params.id } }).
        then(result => {
            if (result) {
                res.json(result);
            }
            else {
                res.sendStatus(404);
            }
        }
        )
        .catch(error => {
            res.status(412).json({ msg: error.message })
        })
})
    .put((req, res) => {

            db.update(req.body, { where: { subjectid: req.params.id } })
            .then(result => { db.findOne({ where: { subjectid: req.params.id } }).then(ress => { res.send(ress); console.log(ress) }) })
            .catch(error => res.sendStatus(412).json({ msg: error.message }));

    })
    .delete((req, res) => {
    
        db
            .destroy({ where: { subjectid: req.params.id } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
   
route.route("/").get((req, res) => {
    
    db.findAll({}).then(result => res.json(result))
        .catch(errror => {
            res.status(412).json({ msg: error.message });
        });
})
    .post((req, res) => {
            db.create(req.body).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    });


route.route("/:subjectid/teachers").get((req, res) => {
        teacher.findAll({where:{teacherid:req.params.subjectid}}).then(result => res.json(result))
        .catch(errror => {
            res.status(412).json({ msg: error.message });
        });
})
    .post((req, res) => {
    
        db.create(req.body).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    });



module.exports = route;