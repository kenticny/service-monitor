/**
 * add class name to element
 * @param {Element} elem 
 * @param {String} className 
 */
function addClass(elem, className) {
  let classes = elem.className.split(' ');
  classes.push(className);
  classes = classes.map(n => n.trim())
  elem.className = setify(classes).join(' ');
}

/**
 * remove class name from element
 * @param {Element} elem 
 * @param {String} className 
 */
function removeClass(elem, className) {
  let classes = elem.className.split(' ');
  classes = setify(classes)
  let classIdx = classes.indexOf(className);
  if (classIdx > -1) {
    classes.splice(classIdx, 1);
  }
  elem.className = classes.join(' ');
}

/**
 * convert array to set
 * @param {Array} arr 
 */
function setify(arr) {
  return arr.filter(function(l, i, a) {
    return a.indexOf(l) == i;
  });
}