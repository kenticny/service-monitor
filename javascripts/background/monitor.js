function addMonitor(monitor) {
  monitor = _.pick(monitor, _.keys(Monitor))
  if (_.keys(monitor).length == 0) {
    return Promise.reject('Missing parameters');
  }
  return pushItem(monitor)
}

function listMonitor() {
  return listItem();
}

function refreshMonitor() {
  
}

function init() {

}