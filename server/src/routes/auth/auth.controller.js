async function register(req, res) {
  return res.status(200).json({
    msg: 'working fine',
  });
}

module.exports = {
  register,
};
