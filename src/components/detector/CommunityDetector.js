import findInArray from '../../helpers/findInArray';
import isArray from '../../helpers/isArray';
import qDiff from './qDiff';

// This community detection component implements the Louvain method for modularizing
// a set of nodes.
//
// sigma_in = The sum of the weights of the links internal to C
// sigma_tot = The sum of the weights of the links incident to the nodes in C
// k_i = The degree of node i
// k_i_in = The sum of the weights of the links from node i to the nodes in C
// m = The sum of the weight of all links in the network
//

const CommunityDetector = (list) => {
  if(list && typeof list === 'object' && list.nodes && list.links) {
    console.time('community detection');
    let nodes = list.nodes;
    let links = list.links;
    let nodeLinks = {};
    let incidentSums = {};
    let nodeGroups = {};
    let m_sum = 0;

    //* DEBUGGING *//
    let groupChanges = {};

    // Calculate total number of links in the network
    links.forEach((link) => {
      m_sum += link.strength;
    });
    console.log('m =',m_sum);

    // Figure out which nodes have which links
    nodes.forEach((node,i) => {
      let nodeId = node.id;

      nodeLinks[nodeId] = findInArray(links,{ source: node.id },{ target: node.id });
      groupChanges[nodeId] = [];
      nodeGroups[nodeId] = i;

      let incidentSum = 0;

      nodeLinks[nodeId].forEach((link) => {
        // Sum all links to any given node
        incidentSum += link.strength;
      });

      incidentSums[nodeId] = incidentSum;
    });

    // Initialize algorithm parameters
    let count = 0;
    let lastMaxQDiff = 0;
    let maxQDiff = 0;
    let isNotOptimized = true;

    do {
      count++;

      let groups = {};
      let groupSigmaIn = {};
      let groupSigmaTot = {};

      for(var key in nodeGroups) {
        if(!isArray(groups[nodeGroups[key]])) groups[nodeGroups[key]] = [];

        groups[nodeGroups[key]].push(key);
      }

      // At the group level, we need to calculate both the sum of the weights
      // inside C and the sum of the weights of all links incident to C
      for(var key in groups) {
        let groupLinks = [];
        let group = groups[key];

        groupSigmaIn[key] = 0;
        groupSigmaTot[key] = 0;

        group.forEach((nodeId) => {
          groupLinks = groupLinks.concat(nodeLinks[nodeId]);
        });

        // Eliminate duplicates
        groupLinks = [...new Set(groupLinks)];

        groupLinks.forEach((groupLink) => {
          let strength = groupLink.strength;
          let sourceGroup = nodeGroups[groupLink.source];
          let targetGroup = nodeGroups[groupLink.target];

          if(sourceGroup === targetGroup) {
            groupSigmaIn[key] += strength;
          }

          groupSigmaTot[key] += strength;
        });
      }

      // Now we track the change in modularity produced by adding a node to
      // each group it has links to
      nodes.forEach((node) => {
        let nodeId = node.id;
        let links = nodeLinks[nodeId];
        let q = [];
        let k_i = incidentSums[nodeId];

        links.forEach((link) => {
          let linkId = nodeId === link.source ? link.target : link.source;
          let newGroupKey = nodeGroups[linkId];
          let sigma_tot = groupSigmaTot[newGroupKey];
          let sigma_in = groupSigmaIn[newGroupKey];
          let k_iin = 0;

          groups[newGroupKey].forEach((groupNodeId) => {
            let potentialLink = findInArray(links,{ source: groupNodeId, target: nodeId }, { source: nodeId, target: groupNodeId });
            // Calculate the weight of the links from current node to nodes
            // in group C (k_iin)
            if(potentialLink.length) {
                k_iin += potentialLink[0].strength;
            }
          });

          // Now we can add k_iin to the group's sigma_in and subtract it from the
          // sigma_tot
          sigma_tot = sigma_tot + k_i;
          sigma_in = sigma_in + k_iin;

          let modularity = qDiff(sigma_in,sigma_tot,k_i,k_iin,m_sum);

          q.push(modularity);
        });

        let qMax = Math.max.apply(null,q);

        maxQDiff = maxQDiff < qMax ? qMax : maxQDiff;

        if(qMax > 0) {
          let maxIndex = q.indexOf(qMax);

          if(maxIndex > -1) {
            let newTarget = links[maxIndex].target;
            let newSource = links[maxIndex].source;
            let oldGroup = nodeGroups[nodeId];
            let newGroup = nodeGroups[newSource === nodeId ? newTarget : newSource];

            nodeGroups[nodeId] = oldGroup !== newGroup ? newGroup : oldGroup;
            groupChanges[nodeId].push([oldGroup,newGroup]);
          }
        }
      });

      if(maxQDiff !== lastMaxQDiff) {
        lastMaxQDiff = maxQDiff;
      } else {
        console.log('QDiff cannot be improved -- optimization complete!');
        isNotOptimized = false;
      }
    } while(isNotOptimized);

    // Now add nodes to their final groups
    nodes.forEach((node) => {
      node.group = nodeGroups[node.id];
    });
  }

  console.timeEnd('community detection');
  return list;
}

export default CommunityDetector;
