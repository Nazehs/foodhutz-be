const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = {
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 11,
    maxLength: 13,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
  },
  userType: {
    type: String,
    enum: ["DRIVER", "USER", "RESTAURANT"],
    default: "DRIVER",
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  bankDetails: {
    type: Schema.Types.ObjectId,
    ref: "BankDetail",
  },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
});

schema.pre("save", async function (next) {
  console.log(this);
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", schema);

module.exports = User;
