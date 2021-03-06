class HeaderBar {
  constructor(title) {
    this.navTitle = document.querySelector('#nav-bar .title-bar');
    this.navRight = document.querySelector('#nav-bar .right-bar');
    this.navLeft = document.querySelector('#nav-bar .left-bar');
    
    this._resetHeader();

    this.setNavTitle(title);
    this._initLeftView();
  }

  /**
   * set title bar content
   * @param {String} title 
   */
  setNavTitle(title) {
    this.title = title;
    this.navTitle.innerHTML = title;
  }

  clearNavTitle() {
    this.navTitle.innerHTML = '';
  }

  getNavTitle() {
    return this.title;
  }

  /**
   * set title bar right view
   * @param {Elements} iconViews 
   */
  setRightView(...iconViews) {
    for (let info of iconViews) {
      let view = this._iconBtn(info.icon, info.click || function() {});
      this.navRight.appendChild(view);
    }
  }

  /**
   * set title bar left view
   * @param {Elements} iconViews 
   */
  _initLeftView() {
    let history = HistoryStack.getInstance();
    if (!history.isRoot()) {
      let backIcon = this._iconBtn('back', function() {
        let back = HistoryStack.getInstance().popHistory();
        (back.renderFunc || function() {})();
      });
      this.navLeft.appendChild(backIcon);
    }
  }

  /**
   * create element with iconfont
   * @param {String} icon 
   */
  _iconBtn(icon, handle) {
    let iconView = document.createElement('span');
    iconView.className = 'icon-view iconfont icon-' + icon;
    iconView.onclick = handle;
    return iconView;
  }

  _resetHeader() {
    this.clearNavTitle();
    _.removeAllChildren(this.navRight);
    _.removeAllChildren(this.navLeft);
  }

}