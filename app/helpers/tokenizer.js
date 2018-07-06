import 'babel-polyfill';
import jwt from 'jsonwebtoken';


/**
 * @function verifyPayload
 * @param {object} data - An object to be encoded into a token
 * @description function  without return value that ensures that the object
 *       to be tokenized is an object with the necessary keys.
 *       The function throws a TypeError without the right value
 * @returns { null } returns undefined
 */
const verifyPayload = (data) => {
  // make sure the neccessary keys are present, only works if the data passed is an object :)
  if (data._id && data.name) return;
  throw new TypeError("The object passed in should have keys 'id', 'username', 'name' and 'avatar'");
};


/**
 * @function Tokenizer
 * @param {object} payload - A value of type Object to be encoded into a token
 * @description   function that encodes a given object into a token
 *  using the jsonwebtoken library. Ensure the process.env.SECRET_KEY is present in the .env file.
 * The function forms a new object from the argument passed.
 * New object contains only the keys 'avatar', 'id', 'name', 'username'
 * @returns {string} The token generated by the jsonwebtoken lib
 */
export const Tokenizer = (payload) => {
  verifyPayload(payload);
  const { name, username, avatar, _id } = payload;
  const filteredPayload = { name, username, avatar, _id }; /* eslint object-curly-newline: 0 */
  const token = jwt.sign(filteredPayload, process.env.SECRET_KEY);
  return token;
};


/**
 * @function decodeToken
 * @param {string} token - jwt token to be decoded
 * @description this function takes in a token, returns the payload using the jsonwebtoken library
 * It requires the presence of a process.env.SECRET_KEY
 * @returns {object} returns the payload of the token
 */
export const decodeToken = (token) => {
  try {
    if (token.constructor !== String) {
      throw new TypeError('Please send in a token string, seems like you passed a wrong data type or nothing at all');
    }
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw err;
  }
};
