const { graphql } = require('@octokit/graphql');

// Export an authenticated client
module.exports.client = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
    'user-agent': 'swinton/on-my-plate'
  }
});
