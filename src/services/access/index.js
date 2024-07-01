"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const shopModel = require("../../models/shop.model");
const { getInfoData } = require("../../utils");

const SHOP_ROLES = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      const holder = await shopModel.findOne({ email });

      if (holder) {
        return {
          code: "[error_code]",
          message: "Shop already existed!",
        };
      }
      // hash pwd & create account
      const hashedPwd = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        name,
        email,
        password: hashedPwd,
        roles: [SHOP_ROLES.SHOP],
      });
      console.log('-------------------- HEREs', newShop)

      // create access token
      if (newShop) {
        // private key  -> send to user     | sign token
        // public key   -> save in our side | verify token
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pen'
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pen'
          }
        });

        console.log({ privateKey, publicKey })
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey
        });

        if (!publicKeyString) {
          return {
            code: '[error_code]',
            message: 'publicKeyString error'
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        const tokens = await createTokenPair({
          userId: newShop._id,
          email
        }, publicKeyString, privateKey)

        console.log('Tokens are created::', tokens);

        return {
          code: 200,
          metadata: {
            tokens,
            shop: getInfoData({
              fields: ['_id', 'name', 'email'],
              object: newShop
            })
          }
        }
      }
    } catch (err) {
      console.log(err)
      
      return {
        code: "[error_code]",
        message: err.message,
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
