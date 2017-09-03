const ViewClass = {
  current: {},

  /**
   * render view by view id
   * set view from hide to visible
   * @param {String} viewID 
   */
  renderView(viewID, info, isBack) {
    // push current view into history
    if (Object.keys(this.current).length !== 0 && !isBack) {
      console.log('Push history')
      let history = new History(this.current.renderFunc);
      HistoryStack.getInstance().pushHistory(history);
    }
console.log(HistoryStack.getInstance().stack)
    // create view header
    let header = new HeaderBar(info.title);
    header.setRightView.apply(header, info.right);

    let view = document.getElementById(viewID);
    let activeViews = document.querySelectorAll('.view.active');
    for (let i = 0; i < activeViews.length; i++) {
      removeClass(activeViews[i], 'active');
    }
    addClass(view, 'active');

    // set current view info
    this.current.renderFunc = info.info.renderFunc;
  }
};
