'use babel';

const atom = global.atom;

export default class CommandHelper {

  // constructor() {
    // this._populateEnvVariables();
    // this.editorDisposable = atom.workspace.observeActiveTextEditor(this._updateActiveVariables); // Not needed
  // }

  test() {
    this._prepareParse();
    console.log(this.envVars);
  }

  parseCommand(command) {
    this._prepareParse();
    const regexp = /{(.*?)}/g;
    const match = regexp.exec(command);
    match.forEach((item) => {
      const translated = this._translateVariable(item);
      command.replace(`{${item}}`, translated);
    });
    return command;
  }

  _prepareParse() {
    if (this.lastPath !== undefined &&
        this.lastPath === atom.workspace.getActiveTextEditor().getPath()) return;

    if (this.envVars === undefined) {
      this._populateEnvVariables();
    }
  }

  _translateVariable(variable) { // Return nothing or dont change if variables doesn't exist?
    return (this.envVars[variable] !== undefined) ? this.envVars[variable] : '';
  }

  _populateEnvVariables() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor === undefined) return; // Maybe call another function to try to populate variables
    const relativizedPath = atom.project.relativizePath(editor.getPath());
    this.envVars = [];
    this.envVars.AbsoluteFilePath = editor.getPath();
    this.envVars.ProjectPath = relativizedPath[0];
    this.envVars.RelativeFilePath = relativizedPath[1];
    this.envVars.FileTitle = editor.getTitle();
    this.envVars.RelativeFolder = relativizedPath[1].slice(0, -1 * editor.getTitle().length);
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
