export const nativeAliases: Record<string, string> = {
  ls: process.platform === "win32" ? "dir" : "ls",
  dir: process.platform === "win32" ? "dir" : "ls",
  pwd: process.platform === "win32" ? "cd" : "pwd",
  cwd: process.platform === "win32" ? "cd" : "pwd",
  cat: process.platform === "win32" ? "type" : "cat",
  rm: process.platform === "win32" ? "del" : "rm",
  cp: process.platform === "win32" ? "copy" : "cp",
  mv: process.platform === "win32" ? "move" : "mv",
  clear: process.platform === "win32" ? "cls" : "clear",
};