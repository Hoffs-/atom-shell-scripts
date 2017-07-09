'use babel';

import { CompositeDisposable } from 'atom';
import ShellScriptsView from './shell-scripts-view';
import CommandHelper from './command-helper';

const atom = global.atom;

export default {

  shellScriptsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.shellScriptsView = new ShellScriptsView(state.shellScriptsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.shellScriptsView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'shell-scripts:toggle': () => this.toggle(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.shellScriptsView.destroy();
  },

  serialize() {
    return {
      shellScriptsViewState: this.shellScriptsView.serialize(),
    };
  },

  toggle() {
    this.test = new CommandHelper();
    if (this.modalPanel.isVisible()) {
      this.test.cleanup();
    }
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },
};
