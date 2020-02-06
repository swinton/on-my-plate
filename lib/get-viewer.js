const { client } = require('./client');

module.exports = async function getViewer() {
  const {
    viewer: { login }
  } = await client(`{
    viewer {
      login
    }
  }`);
  return login;
};
