const MONITOR_LIST_KEY = 'monitor_list';
const MONITOR_LIST_IDX = 'monitor_list_idx';

/**
 * Push a new item into sync storage
 * @param {Object} item
 */
function pushItem(item) {
  return new Promise((fulfill, reject) => {
    chrome.storage.sync.get(MONITOR_LIST_KEY, data => {
      let list = data[MONITOR_LIST_KEY]
      if (!Array.isArray(list)) {
        list = [];
      }
      list.push(item);
      let storageData = {};
      storageData[MONITOR_LIST_KEY] = list;
      chrome.storage.sync.set(storageData, () => {
        return fulfill(list);
      });
    });
  })
}

/**
 * List the monitor datas
 */
function listItem() {
  return new Promise((fulfill, reject) => {
    chrome.storage.sync.get(MONITOR_LIST_KEY, data => {
      let list = data[MONITOR_LIST_KEY];
      if (!Array.isArray(list)) {
        return fulfill([]);
      }
      list = list.map((n, i) => {
        n.id = i + 1;
        return n;
      });
      return fulfill(list);
    })
  });
}

/**
 * Remove item from storage list
 * @param {Number} idx  item index
 */
function removeItem(idx) {
  return new Promise((fulfill, reject) => {
    listItem().then(list => {
      list.splice(idx - 1, 1);
      let storageData = {};
      storageData[MONITOR_LIST_KEY] = list;
      chrome.storage.sync.set(storageData, () => {
        return fulfill(list);
      });
    });
  })
}