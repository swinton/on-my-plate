const { client } = require('./client');

const openKRs = `query openKRs($assignee: String!) {
  resource(url: "https://github.com/github/business-development") {
    ... on Repository {
      issues(first: 100, states: [OPEN], filterBy: {milestone: "5053151", assignee: $assignee}) {
        totalCount
        nodes {
          title
          url
          labels(first: 100) {
            nodes{
              name
            }
          }
        }
      }
    }
  }
}`;

module.exports = async function onMyPlate(assignee) {
  return client(openKRs, {
    assignee
  });
};
