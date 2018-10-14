"use strict";

const Status = {
  UNKNOWN : 'Unknown',
  CLEAN: 'clean',
  DIRTY: 'dirty'
};

const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

//const electron = require('electron');

function parseDir(dir) {
  return /^~/.test(dir) ? os.homedir() + dir.substr(1).trim() : dir.trim();
}

function isDir(dir) {
  try {
    return fs.lstatSync(dir).isDirectory();
  } catch (_) {
    return false;
  }
}

function removeStatus() {
  const el = document.getElementById('status');

  el.classList.remove(Status.UNKNOWN,Status.CLEAN,Status.DIRTY);
  return el;
}

function setStatus(status) {
  const el = removeStatus();
  el.classList.add(status);
}

function checkGitStatus(dir) {
  exec('git status', {
    cwd: dir
  }, (err, stdout, stderr) => {
    console.log("err", err);
    console.log("stdout", stdout);
    console.log("stderr", stderr);

    if (stdout) {
       const el = document.getElementById("stdout");
       el.textContent = stdout;
    }

    if (err) {
      setStatus(Status.UNKNOWN);
      return;
    }

    if (/nothing to commit/.test(stdout)) {
      setStatus(Status.CLEAN);
      return;
    }

    setStatus(Status.DIRTY);
  });
}

let timer;

document.getElementById('input').addEventListener('keyup', evt => {
  clearTimeout(timer);
  timer = setTimeout( () => {
    const input = parseDir(evt.target.value);
    console.log("Less frequent: ",input);
    if (isDir(input)) {
        checkGitStatus(input);
        return;
    }
    removeStatus();
  }, 500);
});
