import findInArray from '../../helpers/findInArray';

class Node {
  constructor(name,targets) {
    this.name = name || '';
    this.targets = targets || [];
  }

  getName() {
    return this.name;
  }
  getTargets() {
    return this.targets;
  }
  getTarget(query) {
    return findInArray(this.targets,query);
  }
  getTargetIndex(target) {
    return this.targets.indexOf(target);
  }
  setName(name) {
    this.name = name;
  }
  setTargets(targets) {
    this.targets = targets;
  }
  addTarget(name) {
    this.targets.push({ name, frequency: 1 });
  }
  updateTarget(query,update) {
    let target = findInArray(this.targets,query);

    if(target) {
      for(var param in update) {
        target[param] = update[param];
      }
    }
  }
  deleteTarget(query) {
    let target = findInArray(this.targets,query);

    if(target) {
      targets.splice(target.getTargetIndex(),1);
    }
  }
}

export default Node;
