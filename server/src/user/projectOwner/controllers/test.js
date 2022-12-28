import moment from 'moment';

const testOne = async (req, res) => {
  const date = new Date();
  // console.log(moment().format('MMM Do YYYY'));

  let tt = `${moment().format('L')} - ${moment().format('LTS')}`;

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let presendDate = `${day}-${month}-${year}`;
  res.send({ msg: 'hass access', email: req.user, time: tt });
};

export default testOne;
