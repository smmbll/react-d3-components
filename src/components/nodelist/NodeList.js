import findInArray from '../../helpers/findInArray';
import Link from './Link';

const NodeList = (data) => {
  if(data && typeof data === 'object' && data.forEach) {
    let list = {
      nodes: [],
      links: []
    };
    let nodes = list.nodes;
    let links = list.links;
    let added = {};

    data.forEach((group) => {
      group.forEach((source) => {
        // If not in array, add it
        if(added[source] === undefined) {
          nodes.push({ id: source, group: 0 });
          added[source] = true;
        }

        let sourceIndex = group.indexOf(source);
        let targets = group.slice(0,sourceIndex).concat(group.slice(sourceIndex + 1));

        targets.forEach((target) => {
          let link = findInArray(links,{ source: source, target: target },{ source: target, target: source });

          if(link !== null) {
            link.strength++;
          } else {
            links.push(Link(source,target));
          }
        });
      });
    });

    links.sort((a,b) => {
      var lowerA = a.source.toLowerCase();
      var lowerB = b.source.toLowerCase();
      var order = 0;

      if(lowerA < lowerB) {
        order = -1;
      } else {
        order = 1;
      }

      return order;
    });

    nodes.sort((a,b) => {
      var lowerA = a.id.toLowerCase();
      var lowerB = b.id.toLowerCase();
      var order = 0;

      if(lowerA < lowerB) {
        order = -1;
      } else {
        order = 1;
      }

      return order;
    });

    return list;
  }
}

export default NodeList;
