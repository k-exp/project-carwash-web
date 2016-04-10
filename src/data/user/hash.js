import bcrypt from 'bcrypt-nodejs';

export function noSaltHash(plaintext, next) {
  bcrypt.hash(plaintext, null, null, function (err, hash) {
    if(err) {
      return next(err, false);
    }
    else {
      return next(null, hash);
    }
  });
}


export function noSaltCompare(plaintext, hash, next) {
  bcrypt.compare(plaintext, hash, function (err, res) {
    if(err) {
      return next(err, false);
    }
    else {
      return next(null, res);
    }
  });  
}
