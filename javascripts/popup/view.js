const ViewClass = {
  current: {},

  /**
   * render view by view id
   * set view from hide to visible
   * @param {String} viewID 
   */
  renderView(viewID, headerbar) {
    console.log(HistoryStack.getInstance().stack)
    let view = document.getElementById(viewID);
    let activeViews = document.querySelectorAll('.view.active');
    for (let i = 0; i < activeViews.length; i++) {
      removeClass(activeViews[i], 'active');
    }
    addClass(view, 'active');

    // set history
    if (Object.keys(this.current).length !== 0) {
      let history = new History(this.current.view, this.current.title);
      HistoryStack.getInstance().pushHistory(history);
    }

    // set current view info
    this.current.title = headerbar.getNavTitle();
    this.current.view = view;
  }

};