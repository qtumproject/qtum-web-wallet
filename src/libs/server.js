import insight from 'libs/nodes/insight'

let nodeConfigs = {
  insight: insight
}

const defaultNodeId = 'insight'
let currentNodeId = defaultNodeId

export default {
  currentNode() {
    return nodeConfigs[currentNodeId]
  },

  setNodeId(nodeId) {
    if (nodeConfigs[nodeId]) {
      currentNodeId = nodeId
    }
  }
}
