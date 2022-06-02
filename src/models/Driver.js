const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const locationSchema = require("./LocationSchema");
const geocoder = require("../utils/geoCoder");
const getGeoLocation = require("../utils/googleGeoCoder");
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
  postCode: { type: String },
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
  lastKnownLocation: {
    index: "2dsphere",
    type: locationSchema,
  },
  location: {
    type: locationSchema,
    index: "2dsphere",
    // sparse: true,
  },
  wallet: { type: Number, default: 0 },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
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
    enum: ["Jacket", "Delivery bags", "None", "No", "Helmet"],
    default: "None",
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
      type: Schema.Types.ObjectId,
      ref: "Document",
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
  const {
    data: { results },
  } = await getGeoLocation(this.address);

  // await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [
      results[0].geometry.location.lng,
      results[0].geometry.location.lat,
    ],
    formattedAddress: results[0].formatted_address,
    // postCode:
    //   results[0].address_components[results[0].address_components.length - 1]
    //     .short_name,
    city: results[0].address_components[2].long_name,
  };
  // this.location = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress,
  //   postCode: loc[0].zipcode,
  //   city: loc[0].city,
  // };

  this.address = results[0].formatted_address;

  next();
});
// update the drivers last known location using their postcode
schema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().postCode) {
    const {
      data: { results },
    } = await getGeoLocation(this.getUpdate().postCode);
    // get the longitude and latitude
    this.location = {
      type: "Point",
      coordinates: [
        results[0]?.geometry?.location.lng,
        results[0]?.geometry?.location.lat,
      ],
      formattedAddress: results[0]?.formatted_address,
      city: results[0]?.address_components[2]?.long_name,
      postCode: this.getUpdate()?.postCode,
    };

    // update the location and address
    this._update.$set.lastKnownLocation = this.location;
  }
  next();
});
schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
// Model.aggregate().sample(1).exec((err, docs) => {
//   docs = docs.map(doc => Model.hydrate(doc));
//   docs[0].a; // Should be defined
// });
const Driver = model("Driver", schema);

module.exports = Driver;
