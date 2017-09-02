const popup = {};
popup.Views = {
  renderEmptyListView() {
    new HeaderBar()
    // renderView('empty-list-view');
  },
  renderMonitorListView(list) {

    // init monitor list page header
    let header = new HeaderBar('Monitor List');
    header.setRightView({icon: 'refresh'}, {
      icon: 'add',
      click: function() {
        let newpageHeader = new HeaderBar('Add Monitor');
        ViewClass.renderView('add-monitor-view', newpageHeader);
      }
    });

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
    ViewClass.renderView('monitor-list-view', header)
  }
};

(function() {
  let BG = chrome.extension.getBackgroundPage();

  BG.listItem().then(list => {
    if (!list || list.length == 0) {
      popup.Views.renderEmptyListView();
    } else {
      popup.Views.renderMonitorListView(list);
    }
  });
})();
