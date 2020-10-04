const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
});

userSchema.virtual('id').get(() => {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true
});

userSchema.findById = cb => {
  return this.model('Users').find({ id: this.id }, cb);
};

const User = mongoose.model('Users', userSchema);

exports.findByEmail = email => {
  return User.find({ email: email });
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec((err, users) => {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      });
  });
};

exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate(
    {
      _id: id
    },
    userData
  );
};

exports.removeById = userID => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ id: userId }, err => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};
