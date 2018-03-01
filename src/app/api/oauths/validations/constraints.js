const constraints = {
  /**
   * Validation for request token
   */
  token: {
    username: {
      presenceDepend: { field: 'grant_type', eq: 'password' },
    },
    password: {
      presenceDepend: { field: 'grant_type', eq: 'password' },
    },
    refresh_token: {
      presenceDepend: { field: 'grant_type', eq: 'refresh_token' },
    },
    grant_type: {
      presence: true,
    },
    client_id: {
      presence: true,
    },
    client_secret: {
      presence: true,
    },
  },
};

module.exports = constraints;
