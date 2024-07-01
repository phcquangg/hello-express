"use strict";
const AccessService = require('../services/access');

class AccessController {
  signUp = async (rq, rs, n) => {
    try {
      console.log("[P]::sign_up", rq.body);

      return rs.status(201).json(AccessService.signUp(rq.body))
    } catch (err) {
      n(err);
    }
  };
}

module.exports = new AccessController();
