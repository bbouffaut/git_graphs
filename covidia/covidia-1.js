const graphContainer = document.getElementById("graph-container");
 
// Display options
var withoutAuthor = GitgraphJS.templateExtend("metro", {
  colors: ["#979797", "#008fb5", "#f1c109", "#9966ff", "#3399ff"],
  commit: {
    message: {
      displayAuthor: false,
      displayHash: false,
    },
  },
});
const options = {
  template: withoutAuthor,
  orientation: 'vertical-reverse'
}

// Instantiate the graph.
const gitgraph = GitgraphJS.createGitgraph(graphContainer,options);

// Simulate git commands with Gitgraph API.
const master = gitgraph.branch("master");
master.commit("Initial commit");

const branch1 = gitgraph.branch("E2-US1");
const branch2 = gitgraph.branch("E2-US2");
branch1.commit("Implement Health data retrieval");
branch2.commit("Implement Demographic data retrieval");
const branch3 = gitgraph.branch({
  name: "E2-US2-user1",
  from: branch2,
});
const branch4 = gitgraph.branch({
  name: "E2-US2-user2",
  from: branch2,
});
branch3.commit("Implement per department display");
branch4.commit("Implement time-line");
branch2.merge(branch4);
branch3.merge(branch2);
branch1.commit("Expose Health data with API");
branch3.commit("Integrate with FE");
branch2.merge(branch3);
branch2.commit("Expose Demographic data with API");

master.merge(branch2);
branch1.merge(master);

branch1.commit("Integrate API with App BE");
master.merge(branch1).tag("Production");
