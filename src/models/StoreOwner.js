const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const OrderItem = require("./OrderItem");
const geocoder = require("../utils/geoCoder");
const locationSchema = require("./LocationSchema");
const getGeoLocation = require("../utils/googleGeoCoder");
const storeOwnerSchema = {
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
  city: { type: String, required: true },
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
  userType: { type: String, default: "RESTAURANT" },
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
  storeName: { type: String },
  storeAddress: { type: String, required: true },
  address: { type: String },
  // location: {
  //   type: locationSchema,
  // },
  wallet: { type: Number, default: 0 },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  postCode: { type: String },
  businessType: {
    type: String,
    enum: ["Chef", "Restaurant", "Super Market", "Caterer"],
    default: "Restaurant",
    required: true,
  },
  dateOfJoin: { type: Date, default: Date.now() },
  description: { type: String },
  documents: [{ type: Schema.Types.ObjectId, ref: "Document `" }],
  status: { type: String, enum: ["Online", "Offline"], default: "Offline" },
  openingHours: [{ from: String, to: String, day: String }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  coupons: [{ type: Schema.Types.ObjectId, ref: "Coupon" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
};

const schema = new Schema(storeOwnerSchema, {
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
  // GEOCODE THE CODE
  // const {
  //   data: { results },
  // } = await getGeoLocation(this.storeAddress);

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

const Store = model("StoreOwner", schema);

module.exports = Store;
