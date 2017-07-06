'use babel';

import ShellScriptsView from './shell-scripts-view';
import { CompositeDisposable, Dock } from 'atom';

export default {

  shellScriptsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.shellScriptsView = new ShellScriptsView(state.shellScriptsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.shellScriptsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'shell-scripts:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.shellScriptsView.destroy();
  },

  serialize() {
    return {
      shellScriptsViewState: this.shellScriptsView.serialize()
    };
  },

  toggle() {
    console.log('ShellScripts was toggled');
    //console.log(atom.workspace.getBottomDock().paneContainer);
    if (!atom.workspace.getRightDock === 'undefined') {
       atom.notifications.addWarning('Your editor is <b>deprecated</b>.<br />This option is available only >=1.17.0 version.');
       return;
     }

    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
