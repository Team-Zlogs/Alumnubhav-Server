const Tag = require('../../model/modules/tag');
const Company = require('../../model/modules/companyList');

//search tech
exports.searchTech = async(req, res) => {
    const queryTech = req.query.tech
    await Tag.find({ "tech": { $regex: queryTech, $options: '$i' } })
        .then(docs => {
            res.status(200).json({
                message: "success",
                doc: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}

//search company
exports.searchCompany = async(req, res) => {
    const queryCompany = req.query.company
    await Company.find({ "company": { $regex: queryCompany, $options: '$i' } })
        .then(docs => {
            res.status(200).json({
                message: "success",
                doc: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "internal server error",
                error: err
            })
        })
}