'use babel';

const atom = global.atom;

export default class CommandHelper {

  constructor() {
    this._populateVariables();
    this.editorDisposable = atom.workspace.observeActiveTextEditor(this._updateActiveVariables);
  }

  parseCommand(command) {
    const regexp = /{(.*?)}/g;
    const match = regexp.exec(command);
    match.forEach((item) => {
      const translated = this._translateVariable(item);
      command.replace(`{${item}}`, translated);
    });
    return command;
  }

  _translateVariable(variable) {
    return (this.envVars[variable] !== undefined) ? this.envVars[variable] : false;
  }

  _populateVariables() {
    this.envVars = [];
  }

  _updateActiveVariables() {
    console.log('Active editor chaged');
    if (this.pathDisposable !== undefined) {
      this.pathDisposable.dispose();
    }

    this.editor = atom.workspace.getActiveTextEditor();
    this.pathDisposable = this.editor.onDidChangePath(() => this._pathChanged()); // Not required?
    // this._populateVariables();
  }

  static _pathChanged() {
    console.log('Path changed');
  }

  cleanup() {
    if (this.pathDisposable !== undefined) {
      this.pathDisposable.dispose();
    }
    if (this.editorDisposable !== undefined) {
      this.editorDisposable.dispose();
    }
  }
}
