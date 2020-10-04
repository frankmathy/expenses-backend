const UserModel = require('../models/users.model');

exports.insert = (req, res) => {
  UserModel.createUser(req.body).then(result => {
    res.status(201).send({ id: result_id });
  });
};
