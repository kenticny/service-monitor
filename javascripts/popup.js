const BG = chrome.extension.getBackgroundPage();
const popup = {};
popup.Views = {
  renderMonitorListView(isBack) {

    // fetch data
    BG.listItem().then(list => {
      if (!list || list.length == 0) {
        // return renderView('empty-list-view');
      }

      // init monitor list page header
      let headerInfo = {
        title: 'Monitor List',
        right: [{icon: 'refresh'}, {
          icon: 'add',
          click: function() {
            popup.Views.renderAddMonitorView();
          },
        }],
        info: {
          renderFunc: popup.Views.renderMonitorListView.bind(this, true),
          params: list
        }
      };

      let monitorList = document.querySelector('#monitor-list-view .monitor-list');
      _.removeAllChildren(monitorList);
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
      ViewClass.renderView('monitor-list-view', headerInfo, isBack)
    });
  },
  renderAddMonitorView(isBack) {
    let nameE = document.getElementById('add-name');
    let urlE = document.getElementById('add-url');
    let checkE = document.getElementById('add-chformat');
    resetForm();
    let headerInfo = {
      title: 'Add Monitor',
      right: [{
        icon: 'ok',
        click: function() {
          var monitorData = {
            name: nameE.value,
            url: urlE.value,
            checkFormat: checkE.value
          };
          BG.addMonitor(monitorData).then(() => {
            HistoryStack.getInstance().clearHistory();
            ViewClass.current = {};
            popup.Views.renderMonitorListView();
          });
        },
      }],
      info: {
        renderFunc: popup.Views.renderMonitorListView.bind(this, true)
      }
    };
    function resetForm() {
      nameE.value = '';
      urlE.value = '';
      checkE.value = '';
    }
    ViewClass.renderView('add-monitor-view', headerInfo, isBack);
  }
};

(function() {
  let BG = chrome.extension.getBackgroundPage();
  popup.Views.renderMonitorListView();
})();
