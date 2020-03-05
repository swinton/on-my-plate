const { client } = require('./client');

const openKRs = `query openKRs($assignee: String!) {
  resource(url: "https://github.com/github/business-development") {
    ... on Repository {
      issues(first: 100, states: [OPEN], filterBy: {assignee: $assignee}, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          number
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
  const {
    resource: {
      issues: { nodes: issues }
    }
  } = await client(openKRs, {
    assignee
  });

  // Filter by high, medium, low priority
  const high = issues.filter(issue => {
    const {
      labels: { nodes: labels }
    } = issue;
    return labels.map(label => label.name).includes('Priority: High');
  });

  const medium = issues.filter(issue => {
    const {
      labels: { nodes: labels }
    } = issue;
    return labels.map(label => label.name).includes('Priority: Medium');
  });

  const low = issues.filter(issue => {
    const {
      labels: { nodes: labels }
    } = issue;
    return labels.map(label => label.name).includes('Priority: Low');
  });

  const noAssignedPriority = issues.filter(issue => {
    const {
      labels: { nodes: labels }
    } = issue;
    return !labels.map(label => label.name).find(label => label.startsWith('Priority'));
  });

  return [high, medium, low, noAssignedPriority];
};
