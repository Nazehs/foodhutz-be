const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const driverSchema = {
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
  tips: [],
  vehicleType: { type: String },
  vehicleNumber: { type: String },
  dateOfJoin: { type: Date, default: Date.now() },
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  documents: [
    {
      name: { type: String },
      status: { type: ["Incomplete", "Completed"], default: "Incomplete" },
      url: { type: String },
    },
  ],
};

const schema = new Schema(driverSchema, {
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

const Driver = model("Driver", schema);

module.exports = Driver;
