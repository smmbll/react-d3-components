import findInArray from '../../helpers/findInArray';
import Node from './Node';

const NodeList = (data) => {
  let nodes = [];

  if(data && typeof data === 'object' && data.forEach) {
    let added = [];

    data.forEach((group) => {
      group.forEach((item) => {
        // Check if the node is already in the list
        let currentNode = findInArray(nodes,{ name: item });

        // If not, add it
        if(!currentNode) {
          nodes.push(new Node(item));

          currentNode = nodes[nodes.length - 1];
        }

        group.forEach((other) => {
          let target = currentNode.getTarget({ name: other });

          if(target) {
            currentNode.updateTarget({ frequency: ++target.frequency });
          } else {
            currentNode.addTarget(other);
          }
        });
      });
    });

    nodes.forEach((node) => {
      node.targets.sort((a,b) => {
        var lowerA = a.name.toLowerCase();
        var lowerB = b.name.toLowerCase();
        var order = 0;

        if(lowerA < lowerB) {
          order = -1;
        } else {
          order = 1;
        }

        return order;
      });
    });

    nodes.sort((a,b) => {
      var lowerA = a.name.toLowerCase();
      var lowerB = b.name.toLowerCase();
      var order = 0;

      if(lowerA < lowerB) {
        order = -1;
      } else {
        order = 1;
      }

      return order;
    });

    console.log(JSON.stringify(nodes));

  }

  return nodes;
}

export default NodeList;
