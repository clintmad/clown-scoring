let Sighting = require('./sighting');
let ds = require('./data-adapter');
let db = ds.Clown;
let sightings = ds.Sighting;


function Clown(name, hair, shoeSize, weapon, psycho) {
    this.name = name;
    this.hair = hair;
    this.shoeSize = shoeSize;
    this.weapon = weapon;
    this.psycho = psycho || true;
    this.dead = false;
    this.sightings = [];
}

function findClown(id, cb) {
    db.findOne({ _id: id }, cb);
};

function findClownAndItsLocations(id, cb) {
    db.findOne({ _id: id }, function (err, clown) {
        if (err || !clown) {
            return cb(err)
        }
        Sighting.findClownSightings(clown._id, function (err, sightings) {
            if (err) {
                return cb(err)
            }
            clown.sightingLocations = sightings
            cb(null, clown)
        })
    })
}

function addClown(clown, cb) {
    let newClown = new Clown(clown.name, clown.hair, clown.shoeSize, clown.weapon, clown.psycho);
    db.insert(newClown, function (err, newClown) {
        if (err) {
            return cb(err);
        }
        return cb(null, { message: "Clown added." });
    })
}

function getClowns(cb) {
    db.find({}, cb)
}

function killClown(id, cb) {

    db.update({ _id: id }, { $set: { dead: true } }, {}, cb)
};

function editClown(id, newClown, cb) {

    db.update({ _id: id }, {
        $set: {
            name: newClown.name,
            hair: newClown.hair,
            shoeSize: newClown.shoeSize,
            weapon: newClown.weapon,
            psycho: newClown.psycho,
            sightings: newClown.sightings
        }
    }, {}, cb)
}

function addSighting(sighting, cb) {
    findClown(sighting.clownId, function (err, clown) {
        if (!clown || err) {
            return cb({ error: err, message: 'Sorry that did not work.' })
        }
        let newSighting = new Sighting.createSighting(sighting);
        sightings.insert(newSighting, function (err, savedSighting) {
            if (err) {
                return cb(err)
            }
            clown.sightings = clown.sightings || []
            clown.sightings.push(savedSighting._id)
            editClown(clown._id, clown, function (err) {
                if (err) {
                    cb(err)
                }
                cb(null, { message: 'You are lucky to be alive with having seen ' + clown.name + ' the clown!' })
            })
        })
    })
}

module.exports = {
    addClown,
    getClowns,
    killClown,
    editClown,
    getClown: findClown,
    findClownAndItsLocations,
    addSighting

}

