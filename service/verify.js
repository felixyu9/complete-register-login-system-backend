const util = require('../utils/util');
const auth = require('../utils/auth');

function verify(requestBody) {
  if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
    return util.buildResponse(401, { 
      verified: false,
      message: 'incorrect request body'
    })
  }

  const user = requestBody.user;
  const token = requestBody.token;
  const verification = auth.verifyToken(user.username, token);
  if (!verification.verified) {
    return util.buildResponse(401, verification);
  }

  return util.buildResponse(200, {
    verified: true,
    message: 'success',
    user: user,
    token: token
  })
}

module.exports.verify = verify;