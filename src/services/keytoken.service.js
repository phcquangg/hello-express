"use strict";

const keyTokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keyTokenModel.create({
        userId,
        publicKey,
        privateKey
      });

      return tokens.publicKey || "";
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
