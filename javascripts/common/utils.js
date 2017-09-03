var _ = {
  pick(obj, fields) {
    if (typeof obj !== 'object') {
      return {};
    }
    if (!Array.isArray(fields)) {
      return {};
    }
    let newObj = {}
    for (let k of fields) {
      if (obj[k]) {
        newObj[k] = obj[k];
      }
    }
    return newObj;
  },
  removeAllChildren(elem) {
    while (elem.hasChildNodes()) {
      elem.removeChild(elem.lastChild);
    }
  },
  isEmptyObject() {

  },
  keys: Object.keys,
}