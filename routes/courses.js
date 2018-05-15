
const ddb=require("../makedatabase").sequelize
const db = require("../makedatabase").Course
const batch=require("../makedatabase").Batch
const lecture=require("../makedatabase").Lecture
const teachers=require('../makedatabase').Teacher
const student=require("../makedatabase").Student
const batchstudent=require('../makedatabase').batchStudent
const route = require('express').Router()



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


route.route("/:courseid/batches").get((req,res)=>{
    batch.findAll({ where: { courseCourseid: req.params.courseid } }).
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


route.route("/:courseid/batches/:batchid/lectures").get((req,res)=>{
    console.log("here")
    lecture.findAll({ where: { batchBatchid: req.params.batchid } }).
        then(result => {
            console.log(result)
        
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
}).post((req, res) => {
      
        db.create(req.body).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    });


route.route('/:courseid/batches/:batchid').get((req,res)=>{
    batch.findOne({ where: { batchid: req.params.batchid } }).
    then(result => {
        if (result) {
            res.json(result);
        }
        else {
            res.sendStatus(404);
        }
    }
    )
}).delete((req, res) => {
        batch
        .destroy({ where: { batchid: req.params.batchid } })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});
route.route("/:courseid").get((req, res) => {

        db.findOne({ where: { courseid: req.params.courseid } }).
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

            db.update(req.body, { where: { courseid: req.params.courseid } })
            .then(result => { db.findOne({ where: { courseid: req.params.courseid } }).then(ress => { res.send(ress); console.log(ress) }) })
            .catch(error => res.sendStatus(412).json({ msg: error.message }));

    })
    .delete((req, res) => {
            db
            .destroy({ where: { courseid: req.params.courseid } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
    
route.route('/:courseid/batches/:batchid/lectures/:lectureid').get((req,res)=>{
    lecture.findOne({ where: { lectureid: req.params.lectureid } }).
    then(result => {
        if (result) {
            res.json(result);
        }
        else {
            res.sendStatus(404);
        }
    }
    )
}).post((req,res)=>{

})



.delete((req, res) => {
        lecture
        .destroy({ where: { lectureid: req.params.lectureid } })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});
route.route("/:courseid/batches/:batchid/lectures").get((req,res)=>{

    console.log("here")
    lecture.findAll({ where: { batchBatchid: req.params.batchid } }).
        then(result => {
            console.log(result)
        
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


route.route('/:courseid/batches/:batchid/lectures/:lectureid').get((req,res)=>{
    lecture.findOne({ where: { lectureid: req.params.lectureid } }).
    then(result => {
        if (result) {
            res.json(result);
        }
        else {
            res.sendStatus(404);
        }
    }
    )
})



.delete((req, res) => {
        lecture
        .destroy({ where: { lectureid: req.params.lectureid } })
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({ msg: error.message });
        });
});

route.route("/:courseid/batches/:batchid/teachers").get((req,res)=>{
    var tempVal=req.params.batchid
ddb.query(`select * from teachers Inner Join lectures ON  lectures.teacherTeacherid=teachers.teacherid and lectures.batchBatchid=${tempVal}  `).spread((result,metadata)=>{
res.json(result)
})

})


route.route("/:courseid/batches/:batchid/students").get((req,res)=>{
   
 var tempVal=req.params.batchid
 var b=batch-students;
 
ddb.query(`select * from lectures`).spread((result,metadata)=>{
res.json(result)
})
}).post((req, res) => {
      
        student.create(req.body).then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    });


module.exports = route;