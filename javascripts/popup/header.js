class HeaderBar {
  constructor(title) {
    this.title = title;
    this.navTitle = document.querySelector('#nav-bar .title-bar');
    this.navRight = document.querySelector('#nav-bar .right-bar');
    this.navLeft = document.querySelector('#nav-bar .left-bar');

    this.setNavTitle(title);
    this._initLeftView();
  }

  /**
   * set title bar content
   * @param {String} title 
   */
  setNavTitle(title) {
    this.navTitle.innerHTML = title;
  }

  /**
   * set title bar right view
   * @param {Elements} iconViews 
   */
  setRightView(...iconViews) {
    for (let info of iconViews) {
      let view = this._iconBtn(info.icon, info.click || (()=>{}));
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
        console.log('back');
      });
      this.navLeft.appendChild(backIcon);
      let homeIcon = this._iconBtn('home', function() {
        console.log('home');
      });
      this.navLeft.appendChild(homeIcon);
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

}