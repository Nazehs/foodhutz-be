const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const locationSchema = require("./LocationSchema");
const geocoder = require("../utils/geoCoder");
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
  userType: {
    type: String,
    default: "DRIVER",
  },
  avatar: { type: String },
  phoneNumber: {
    type: String,
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
    type: String,
    enum: ["Offline", "Online"],
    default: "Offline",
  },
  bankDetails: [
    {
      type: Schema.Types.ObjectId,
      ref: "BankDetail",
    },
  ],
  fullName: {
    type: String,
    maxLength: 70,
    trim: true,
  },
  address: { type: String },
  // location: {
  //   type: locationSchema,
  // },
  tips: [],
  vehicleType: {
    type: String,
    enum: ["Bike", "Bicycle", "Car", "Scooter", "None"],
    description: "None",
  },
  previousExperience: { type: String, enum: ["Yes", "No"], default: "No" },
  needEquipment: { type: String, enum: ["Yes", "No"], default: "No" },
  requestedFor: {
    type: String,
    enum: ["Jacket", "Delivery bags", "Helmet"],
    default: "No",
  },
  vehicleNumber: { type: String },
  jobType: {
    type: String,
    enum: ["Regular", "Part-time"],
    default: "Part-time",
  },
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
  // HASH THE PASSWORD
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // GEOCODE THE CODE
  // const {
  //   data: { results },
  // } = await getGeoLocation(this.address);
  // console.log(loc.data.results[0]);

  // // await geocoder.geocode(this.address);
  // console.log(loc);
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
  // this.location = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress,
  //   postCode: loc[0].zipcode,
  //   city: loc[0].city,
  // };

  // this.address = results[0].formatted_address;

  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Driver = model("Driver", schema);

module.exports = Driver;
