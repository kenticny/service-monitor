let historyInstance = null;
class HistoryStack {
  constructor() {
    this.stack = [];
  }
  static getInstance() {
    if (!historyInstance) {
      historyInstance = new HistoryStack();
    }
    return historyInstance;
  }
  pushHistory(history) {
    this.stack.push(history);
  }
  popHistory() {
    return this.stack.pop();
  }
  clearHistory() {
    let firstView = this.stack.shift();
    this.stack = [];
    return firstView;
  }
  isRoot() {
    return this.stack.length == 0;
  }
}

class History {
  constructor(renderFunc) {
    this.renderFunc = renderFunc;
  }
}