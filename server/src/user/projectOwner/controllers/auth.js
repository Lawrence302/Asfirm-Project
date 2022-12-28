import jwt from 'jsonwebtoken';
import Person from '../models/userModel.js';
import refreshToken from './createNewToken.js';

// middle ware for jwt verification

// works for internal request for API Testing
const auth = async (req, res, next) => {
  //   //name of the auth bearer in browser
  // const authHeather = req.header('auth-token');
  // console.log('header', authHeather);

  // const token = authHeather && authHeather.split(' ')[1];
  // console.log('this', token, 'onetime');

  // console.log(
  //   ' this auth is finally here ',
  //   req.body.headers['auth-token'],
  //   'ending too'
  // );

  //works for external request
  // console.log(req.body);
  // console.log(req.headers['auth-token'], 'from headers auth');
  // console.log(req.body.headers['auth-token'], 'header withoud s');
  // console.log(req.params);
  // console.log('before gotten ', req.headers['auth-token'], 'gotten from here ');
  // console.log('before gotten ', req, 'gotten from here ');
  // console.log('\n\n\n');

  const header = req.headers['auth-token'];
  const token = header && header.split(' ')[1];
  // console.log(token, '   has tokens ');

  if (!token) {
    // console.log('no token found');
    return res.status(400).send({ error: 'Not Authenticated' });
  }

  try {
    //verifying the token
    let tokenInfo = await jwt.verify(token, process.env.TOKEN_KEY);

    // console.log(tokenInfo, 'is verified');
    if (!tokenInfo) {
      return res.status(400).send({ error: 'Not Authenticated' });
    }
    const id = tokenInfo.load;
    // console.log(id)
    const user = await Person.findById(id);
    // console.log(token)

    const userHasToken = user.refreshToken.includes(token);

    if (!userHasToken) {
      return res.status(400).send({ error: 'Not Authenticated' });
    }

    // if(user.refreshToken.includes(token)){
    //     console.log("it has it in ")
    // }
    // console.log(isin)

    next();
  } catch (e) {
    res.status(500).send({ error: 'Not Authenticated', message: e.message });
  }
};

export default auth;
