# VS Code JavaScript Standard Format

This extension adds [Standard format](https://github.com/maxogden/standard-format) function to JavaScript.

Please only use it when you are ok with [JavaScript Standard Style](http://standardjs.com/).

## Changes

### 0.0.8 (2016-03-13)

1. Optimized code
2. Fixed readme

### 0.0.7 (2016-03-12)

1. Added keybindings notes.

### 0.0.6 (2016-03-12)

1. Added a new command to workaround the [problem](https://github.com/chenxsan/vscode-standard-format/issues/1) with the latest Visual Studio Code 0.10.10


## Installation

1. Press `F1` to bring up Command Palette
2. Search for `Extensions: Install Extension` and select the command, VS Code would load all available extensions
    ![Extensions: Install Extension](install-extension.png)
3. Input `JavaScript Standard Format`, VS Code will filter the extension out, click and install it
    ![search extension](search-extension.png)

## Usage

1. Press `F1` to bring up Command Palette
2. Search for `Format code with standard-format` and click it
3. It will format the whole document

You can also format only those you selects.

## Keybinding

You can also configurate keybinding in `keybindings.json`, for example:

```
[
  {"key": "shift+cmd+f", "command": "format.standard",
  "when": "editorTextFocus"}
]
```

## License

MIT