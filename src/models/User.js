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
    unique: true,
  },
  avatar: { type: String },
  phoneNumber: {
    type: String,
    minLength: 11,
    maxLength: 14,
    validate: {
      validator: function (v) {
        return /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    unique: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  // driver close to that that location should be able to get the notifications and it will
  // only show only for who accepted it for the delivery
  notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
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
  status: {
    type: Boolean,
    default: false,
  },
  bankDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "BankDetail",
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
};

const schema = new Schema(userSchema, {
  toJSON: {
    getters: true,
  },
  id: true,
  timestamps: true,
});

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

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
