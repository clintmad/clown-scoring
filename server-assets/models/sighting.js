let db = require('./data-adapter').Sighting;

let moment = require('moment')
let d = new Date();

function Sighting(sighting) {
    this.clownId = sighting.clownId;
    this.location = sighting.location;
    this.spotter = sighting.spotter;
    this.date = sighting.date || moment(d).format("MMM Do YY");
    this.time = sighting.time || moment(d).format("h:mm:ss a");
    this.old = false;
}

function findClownSightings(clownId, cb){   
    db.find({clownId: clownId}, cb)
}

function findSighting(id, cb) {
    db.findOne({ _id: id }, cb)
}



function getSightings(cb) {
    db.find({}, cb)
}

function oldSighting(id, cb) {
    db.update({ _id: id }, { $set: { old: true } }, {}, cb)
}

function editSighting(id, newSighting, cb) {
    db.update({ _id: id }, {
        $set: {
            clownId: newSighting.clownId,
            location: newSighting.location,
            spotter: newSighting.spotter,
            date: newSighting.date,
            time: newSighting.time
        }
    }, {}, cb)
}

module.exports = {
    getSightings,
    editSighting,
    oldSighting,
    getSighting: findSighting,
    findClownSightings,
    createSighting: Sighting
}