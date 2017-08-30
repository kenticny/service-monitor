const historyStack = [];

function setNavTitle(title) {
  let navTitle = document.querySelector('#nav-bar .title-bar');
  navTitle.innerHTML = title;
}

function renderView(viewID) {
  let view = document.getElementById(viewID);
  let activeViews = document.querySelectorAll('.view.active');
  for (let i = 0; i < activeViews.length; i++) {
    removeClass(activeViews[i], 'active');
  }
  addClass(view, 'active');
}

function addClass(elem, className) {
  let classes = elem.className.split(' ');
  classes.push(className);
  classes = classes.map(n => n.trim())
  elem.className = setify(classes).join(' ');
}

function removeClass(elem, className) {
  let classes = elem.className.split(' ');
  classes = setify(classes)
  let classIdx = classes.indexOf(className);
  if (classIdx > -1) {
    classes.splice(classIdx, 1);
  }
  elem.className = classes.join(' ');
}

function setify(arr) {
  return arr.filter(function(l, i, a) {
    return a.indexOf(l) == i;
  });
}

const Views = {
  renderEmptyListView() {
    setNavTitle('Monitor List');
    renderView('empty-list-view');
  },
  renderMonitorListView(list) {
    setNavTitle('Monitor List');
    let monitorList = document.querySelector('#monitor-list-view .monitor-list');
    for (let item of list) {
      let itemElem = document.createElement('li');
      itemElem.innerHTML = JSON.stringify(item);
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
