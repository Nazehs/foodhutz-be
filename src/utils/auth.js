const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const secret = process.env.APP_SECRET;
const expiration = "12h";

const signToken = ({ firstName, lastName, email, username, id }) => {
  const payload = { firstName, lastName, email, username, id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    throw new AuthenticationError("Invalid token");
  }

  return req;
};

module.exports = {
  signToken,
  authMiddleware,
};