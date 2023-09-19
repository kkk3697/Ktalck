var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'dkanskdk1',
  database: 'ktalk_live'
});

module.exports.pool = pool;

module.exports.getUser = function(callback) {
  pool.query('SELECT * FROM user', function(error, results, fields) {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
}
module.exports.checkEmail = function(email, callback) {
  pool.query('SELECT * FROM user WHERE email = ?', [email], function(error, results, fields) {
    if (error) {
      return callback(error, null);
    }
    var exists = results.length > 0;
    callback(null, exists);
  });
}
