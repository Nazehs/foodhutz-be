const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const OrderItem = require("./OrderItem");
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
    validate: {
      validator: function (v) {
        return /((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
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
  storeName: { type: String },
  storeAddress: { type: String, required: true },
  postCode: { type: String },
  businessType: {
    type: String,
    enum: ["Chef", "Restaurant", "Super Market", "Caterer"],
    default: "Restaurant",
    required: true,
  },
  dateOfJoin: { type: Date, default: Date.now() },
  documents: [{ type: Schema.Types.ObjectId, ref: "Document `" }],
  status: { type: String, enum: ["Online", "Offline"], default: "Offline" },
  openingHours: [{ from: String, to: String, day: String }],
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  coupon: [{ type: Schema.Types.ObjectId, ref: "Coupon" }],
  orders: [OrderItem],
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
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
  next();
});

schema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Store = model("StoreOwner", schema);

module.exports = Store;
