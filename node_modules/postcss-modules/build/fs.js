"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSystem = getFileSystem;
exports.setFileSystem = setFileSystem;
let fileSystem = {
  readFile: () => {
    throw Error("readFile not implemented");
  },
  writeFile: () => {
    throw Error("writeFile not implemented");
  }
};

function setFileSystem(fs) {
  fileSystem.readFile = fs.readFile;
  fileSystem.writeFile = fs.writeFile;
}

function getFileSystem() {
  return fileSystem;
}