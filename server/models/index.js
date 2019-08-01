const db = require("../db");

module.exports = {
  getQuestion: id => {
    db.any(`SELECT * FROM question WHERE id = ${id}`, [true])
      .then(function(data) {
        console.log(data);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
};
