import { Operation } from "../types";

export const rebuildMessage = (ops: Operation[]) => {
  let text = '';
  ops.sort((a, b) => a.timestamp - b.timestamp)
    .forEach((op) => {
      if (op.type === 'insert') text = text.slice(0, op.position) + op.value + text.slice(op.position);
      if (op.type === 'delete') text = text.slice(0, op.position) + text.slice(op.position + 1);
    });
  return text;
};