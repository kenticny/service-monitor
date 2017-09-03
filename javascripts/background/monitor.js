let running = null;

function addMonitor(monitor) {
  monitor = _.pick(monitor, _.keys(Monitor))
  if (_.isEmptyObject(monitor)) {
    return Promise.reject('Missing parameters');
  }
  return pushItem(monitor)
}

function listMonitor() {
  return listItem();
}

function refreshMonitor() {
  
}