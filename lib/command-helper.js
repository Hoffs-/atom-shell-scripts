'use babel';

const atom = global.atom;

export default class CommandHelper {

  // constructor() {
    // this._populateEnvVariables();
    // this.editorDisposable = atom.workspace.observeActiveTextEditor(this._updateActiveVariables); // Not needed
  // }

  parseCommand(command) {
    const regexp = /{(.*?)}/g;
    const match = regexp.exec(command);
    match.forEach((item) => {
      const translated = this._translateVariable(item);
      command.replace(`{${item}}`, translated);
    });
    return command;
  }

  _prepareParse() {
    if (this.envVars === undefined) {
      this._populateEnvVariables();
    }
  }

  _translateVariable(variable) {
    return (this.envVars[variable] !== undefined) ? this.envVars[variable] : false;
  }

  _populateEnvVariables() {
    // atom.project.getPaths() // Returns every open project folder
    this.envVars = [];
    // this.envVars['']
    console.log(atom.project.relativizePath(this.editor.getPath()));
  }

  _updateActiveVariables() {
    console.log('Active editor chaged');
    if (this.pathDisposable !== undefined) {
      this.pathDisposable.dispose();
    }

    this.editor = atom.workspace.getActiveTextEditor();
    // this.pathDisposable = this.editor.onDidChangePath(() => this._pathChanged()); // Not required?
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
