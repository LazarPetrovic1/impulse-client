const DANGEROUS_PATTERNS = [
  "rm -rf",
  "shutdown",
  "format",
  "mkfs",
  "dd ",
  "sudo ",
  "curl ",
  "wget ",
];

export function validateCommand(command: string) {
  for (const pattern of DANGEROUS_PATTERNS) {
    if (command.includes(pattern)) throw new Error(`Blocked dangerous command: ${pattern}`);
  }
  return true;
}