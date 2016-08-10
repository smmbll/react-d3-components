import CommunityDetector from '../detector/CommunityDetector';
import findInArray from '../../helpers/findInArray';
import Link from './Link';

const NodeList = (data,detect) => {
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
        let targets = group.slice(0,sourceIndex)
                        .concat(group.slice(sourceIndex + 1));

        targets.forEach((target) => {
          let link = findInArray(links,{ source: source, target: target },{ source: target, target: source });

          if(link.length) {
            link[0].strength++;
          } else {
            links.push(Link(source,target));
          }
        });
      });
    });

    if(detect) {
      list = CommunityDetector(list);
    }

    return list;
  }
}

export default NodeList;
