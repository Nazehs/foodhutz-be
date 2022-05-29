const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const OrderItem = require("./OrderItem");
const geocoder = require("../utils/geoCoder");
const locationSchema = require("./LocationSchema");
const getGeoLocation = require("../utils/googleGeoCoder");
const userSchema = {
  firstName: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    maxLength: 50,
    trim: true,
  },
  fullName: {
    type: String,
    maxLength: 70,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  wallet: { type: Number, default: 0 },
  avatar: { type: String },
  address: { type: String },
  location: {
    type: locationSchema,
  },
  phoneNumber: {
    type: String,
    trim: true,
    unique: true,
    minLength: 11,
    maxLength: 14,
    // validate: {
    //   validator: function (v) {
    //     return (
    //       /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/.test(v) ||
    //       /(^(\+)?234[\( ]?[0-9]{3}\)? ?[0-9]{3}[\- ]?[0-9]{4})|(^[0-9]{4}[\- ]?[0-9]{3}[\- ]?[0-9]{4})|(^01 ?[0-9]{3} ?[0-9]{4})|(^\+234 1 [0-9]{3} [0-9]{4})/.test(
    //         v
    //       )
    //     );
    //   },
    //   message: (props) => `${props.value} is not a valid phone number!`,
    // },
    required: [true, "User phone number required"],
  },
  gender: {
    type: String,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    maxLength: 100,
    unique: true,
    trim: true,
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
    default: "USER",
  },
  password: {
    type: String,
    // required: true,
    minLength: 8,
    trim: true,
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
  orders: [OrderItem],
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
  // // GEOCODE THE CODE
  // const {
  //   data: { results },
  // } = await getGeoLocation(this.address);
  // console.log(loc.data.results[0]);

  // this.location = {
  //   type: "Point",
  //   coordinates: [
  //     results[0].geometry.location.lng,
  //     results[0].geometry.location.lat,
  //   ],
  //   formattedAddress: results[0].formatted_address,
  //   postCode:
  //     results[0].address_components[results[0].address_components.length - 1]
  //       .short_name,
  //   city: results[0].address_components[2].long_name,
  // };

  // this.address = results[0].formatted_address;
  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", schema);

module.exports = User;
