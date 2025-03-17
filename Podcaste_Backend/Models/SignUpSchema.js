const mdb = require("mongoose");
const SignUpSchema = mdb.Schema({
  username: String,
  emailid: String,
  password: String,
  phonenumber: String,
});

const signupschema = mdb.model("SIGNUPMAIN", SignUpSchema);
module.exports = signupschema;
