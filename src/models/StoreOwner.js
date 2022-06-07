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
  avatar: {
    type: String,
    default:
      "https://smallbizclub.com/wp-content/uploads/2015/12/4-Things-You-Should-Know-About-Opening-a-Restaurant.jpg",
  },
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
  isOnline: {
    type: String,
    default: "Offline",
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
  location: {
    type: locationSchema,
  },
  wallet: { type: Number, default: 0 },
  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  deliveryTime: { type: String, default: "15 Minutes" },
  postCode: { type: String },
  businessType: {
    type: String,
    enum: ["Chef", "Restaurant", "Super Market", "Caterer"],
    default: "Restaurant",
    required: true,
  },
  stripeID: {
    type: String,
  },
  stripeAccountId:{
    type: String,
  },
  dateOfJoin: { type: Date, default: Date.now() },
  description: { type: String },
  documents: [{ type: Schema.Types.ObjectId, ref: "Document" }],
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

  const {
    data: { results },
  } = await getGeoLocation(this.postCode);
  this.location = {
    type: "Point",
    coordinates: [
      results[0].geometry.location.lng,
      results[0].geometry.location.lat,
    ],
    formattedAddress: results[0].formatted_address,
    city: results[0].address_components[2].long_name,
    postCode: this.postCode,
  };

  this.storeAddress = results[0].formatted_address;

  next();
});

schema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().postCode) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    const {
      data: { results },
    } = await getGeoLocation(docToUpdate.postCode);
    // get the longitude and latitude
    this.location = {
      type: "Point",
      coordinates: [
        results[0].geometry.location.lng,
        results[0].geometry.location.lat,
      ],
      formattedAddress: results[0].formatted_address,
      city: results[0].address_components[2].long_name,
      postCode: docToUpdate.postCode,
    };

    this.storeAddress = results[0].formatted_address;

    // update the location and address
    this._update.$set.storeAddress = this.storeAddress;
    this._update.$set.location = this.location;
  }
  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Store = model("StoreOwner", schema);

module.exports = Store;
