'use strict';

var searchPartHistoryService = require('../../service/search_part_from_db.service.js');

exports.searchPartHistory = function (req, res) {
    var part_id = req.params.id;
    
    searchPartHistoryService.searchPartHistoryById(part_id)
        .then(function (found) {
            console.log(found);
            if (!found) {
                return res.json(404, 'Unable to find manufacture');
            }
            return res.json(200, found);
        }, function (err) {
            console.log("!found in controller");
            return handleError(res, err);
        });
};

function handleError(res, err) {
    return res.send(500, err);
}
