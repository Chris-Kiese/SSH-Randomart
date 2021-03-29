import { drunkenBishop } from "./drunkenBishop/drunkenBishop.js"

/**
 * Method to create the randomart from a alphanumeric sha256 or MD5 fingerprint.
 * @param {String} fingerprint Must be either
 * @param {Boolean} md5 If a MD5 fingerprint is used this parameter needs to be true. False by default.
 * @param {Boolean} addBorder If this option is selected a border is added around the randomart. True by default.
 * @returns {String} String containing the the randomart with borders, separated by linebreaks
 */
export const randomArt = drunkenBishop;

export default {
    randomArt
}
