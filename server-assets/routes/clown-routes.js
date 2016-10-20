let routes = require('express').Router();
let Clown = require('../models/clown')

routes.route('/clowns/:index?')
    .get(function (req, res) {
        if (req.params.index) {
            res.send(Clown.getClown(req.params.index));
            return
        }
        res.send(Clown.getClowns())
    })
    .post(function (req, res) {
        res.send(Clown.addClown(req.body.clown));        
    })
    .put(function(req, res){
        res.send(Clown.editClown(req.params.index, req.body.clown));
    })
    .delete(function(req, res){
        res.send(Clown.killClown(req.params.index));        
    })

    module.exports = {
        routes
    }