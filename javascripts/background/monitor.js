function addMonitor(monitor) {
  monitor = _.pick(monitor, _.keys(Monitor))
  return pushItem(monitor)
}

function listMonitor() {
  return listItem();
}

function refreshMonitor() {
  
}

function init() {

}