/**
 * render view by view id
 * set view from hide to visible
 * @param {String} viewID 
 */
function renderView(viewID) {
  let view = document.getElementById(viewID);
  let activeViews = document.querySelectorAll('.view.active');
  for (let i = 0; i < activeViews.length; i++) {
    removeClass(activeViews[i], 'active');
  }
  addClass(view, 'active');

  // set history after render view
  let history = new History(view);
  HistoryStack.getInstance().pushHistory(history);
}

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

const Views = {
  renderEmptyListView() {
    new HeaderBar('Monitor List')
    renderView('empty-list-view');
  },
  renderMonitorListView(list) {

    // init monitor list page header
    let header = new HeaderBar('Monitor List');
    header.setRightView({icon: 'refresh'}, {icon: 'add'});

    let monitorList = document.querySelector('#monitor-list-view .monitor-list');
    for (let item of list) {
      let itemElem = document.createElement('li');
      itemElem.className = 'monitor-item';
      
      let row = document.createElement('div')
      itemElem.appendChild(row);

      let nameSpan = document.createElement('span');
      nameSpan.className = 'monitor-name';
      nameSpan.innerHTML = item.name;
      row.appendChild(nameSpan);

      let statusSpan = document.createElement('span');
      statusSpan.className = 'monitor-status';
      statusSpan.innerHTML = item.status;
      row.appendChild(statusSpan);

      monitorList.appendChild(itemElem);
    }
    renderView('monitor-list-view')
  }
};

(function() {
  let BG = chrome.extension.getBackgroundPage();

  BG.listItem().then(list => {
    if (!list || list.length == 0) {
      Views.renderEmptyListView();
    } else {
      Views.renderMonitorListView(list);
    }
  });
})();
