;(function(global) {
  let taskQueueInstance = null;
  class TaskQueue {
    constructor() {
      this.queue = [];
    }
    static getInstance() {
      if (!taskQueueInstance) {
        taskQueueInstance = new TaskQueue();
      }
      return taskQueueInstance;
    }
  }
  
  class Task {
    constructor() {
      this.status = 0;
    }
    run() {

    }
  }
})(window);