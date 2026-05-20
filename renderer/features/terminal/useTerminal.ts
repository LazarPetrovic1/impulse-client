import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "styled-components";
import { getCommand } from "./commands";
import "xterm/css/xterm.css";
import { parseCommand } from "./parser";
import { useHistoryStore } from "./store";
import { useFont } from "../font";
import { normalizePaste } from "./clipboard";
import { Terminal } from "xterm";

export function useTerminal(sessionId?: string) {
  const sessionIdRef = useRef(sessionId);
  useEffect(() => { sessionIdRef.current = sessionId; }, [sessionId]);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<any>(null);
  const fitAddonRef = useRef<any>(null);
  const currentLineRef = useRef("");
  const theme = useTheme();
  const { font, fontSize } = useFont();
  const history = useHistoryStore();
  const themeColors = useMemo(() => ({
    bg: theme.colors.background,
    fg: theme.colors.textPrimary,
  }), [theme.colors.background, theme.colors.textPrimary]);
  useEffect(() => {
    /* SSR GUARD */
    if (typeof window === "undefined") return;
    if (!terminalRef.current) return;
    let mounted = true;
    let term: any;
    let fitAddon: any;
    let resizeObserver: ResizeObserver;
    /* DYNAMIC IMPORTS */
    async function init() {
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");
      if (!mounted) return;
      term = new Terminal({
        convertEol: true,
        cursorBlink: true,
        fontSize,
        fontFamily: font,
        letterSpacing: 0,
        rightClickSelectsWord: false,
        cursorStyle: "bar",
        theme: { background: themeColors.bg, foreground: themeColors.fg, cursor: themeColors.fg },
      });

      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current!);
      const terminalElement =
      terminalRef.current!;

      const handleContextMenu = async (event) => {
        event.preventDefault();
        try {
          const raw = await navigator.clipboard.readText();
          if (!raw) return;
          const pasted = normalizePaste(raw);
          for (const ch of pasted) {
            currentLineRef.current += ch;
            term.write(ch);
          }
          // currentLineRef.current += pasted;
          // term.write(pasted);
        } catch (err) { console.error("Clipboard paste failed:", err); }
      }

      terminalElement.addEventListener("contextmenu", handleContextMenu);
      fitAddon.fit();
      xtermRef.current = term;
      fitAddonRef.current = fitAddon;

      /* SHELL STREAM */
      const unsubscribe = window.terminal.onData((payload) => {
        if (payload.sessionId !== sessionIdRef.current) return;
        term.write(payload.data);
      });

      /* INITIAL PROMPT */
      writePrompt(term);

      /* INPUT HANDLER */

      term.onData(async (data: string) => {
        switch (data) {
          /* ENTER */
          case "\r": {
            const input = currentLineRef.current;
            term.writeln("");
            currentLineRef.current = "";
            const parsed = parseCommand(input);
            if (!parsed.command) { writePrompt(term); return; }
            history.push(input);

            try {
              switch (parsed.type) {
                case "internal": {
                  const command = getCommand(parsed.command);
                  if (!command) {
                    term.writeln(`Unknown command: ${parsed.command}`);
                    break;
                  }

                  await command.execute({
                    term,
                    args: parsed.args,
                    sessionId,
                    historyStore: useHistoryStore.getState(),
                  });

                  break;
                }

                case "native": {
                  const activeSessionId = sessionIdRef.current;
                  if (!activeSessionId) {
                    term.writeln("Native shell unavailable.");
                    break;
                  }
                  window.terminal.write(activeSessionId, parsed.raw + "\r");
                  break;
                }
              }
            } catch (err: any) { term.writeln(`ERROR: ${err.message}`); }
            writePrompt(term);
            return;
          }

          /* CTRL+C */
          case "\u0003": {
            term.writeln("^C");
            currentLineRef.current = "";
            writePrompt(term);
            break;
          }

          /* BACKSPACE */
          case "\u007F": {
            if (currentLineRef.current.length > 0) {
              currentLineRef.current = currentLineRef.current.slice(0, -1);
              term.write("\b \b");
            }
            break;
          }

          /* UP */
          case "\u001b[A": {
            const previous = history.previous();
            replaceCurrentInput(term, currentLineRef.current, previous);
            currentLineRef.current = previous;
            break;
          }

          /* DOWN */
          case "\u001b[B": {
            const next = history.next();
            replaceCurrentInput(term, currentLineRef.current, next);
            currentLineRef.current = next;
            break;
          }

          /* TAB */
          case "\t": {
            break;
          }

          /* NORMAL */

          default: {
            currentLineRef.current += data;
            if (!currentLineRef.current.startsWith("!")) term.write(data);
          }
        }
      });

      /* RESIZE */

      resizeObserver = new ResizeObserver(() => {
        fitAddon.fit();
        const activeSessionId = sessionIdRef.current;
        if (activeSessionId && xtermRef.current) {
          window.terminal.resize(sessionId, xtermRef.current.cols, xtermRef.current.rows);
        }
      });

      resizeObserver.observe(terminalRef.current!);

      /* CLEANUP */

      return () => {
        unsubscribe?.();
        resizeObserver?.disconnect();
        term?.dispose();
        terminalElement.removeEventListener("contextmenu", handleContextMenu);
      };
    }

    init();
    return () => {
      mounted = false;
      resizeObserver?.disconnect();
      term?.dispose();
    };

  }, [sessionId, themeColors.bg, themeColors.fg, font, fontSize]);

  return { terminalRef, xtermRef, fitAddonRef };
}

function writePrompt(term: Terminal) { term.write("$ "); }
function clearCurrentLine(term: Terminal, line: string) {
  for (let i = 0; i < line.length; i++) term.write("\b \b");
}

function replaceCurrentInput(term: Terminal, oldInput: string, newInput: string) {
  const prompt = "$ ";
  const rows = Math.ceil((prompt.length + oldInput.length) / term.cols);
  // move to start
  term.write("\r");
  // move up wrapped rows
  if (rows > 1) term.write(`\x1b[${rows - 1}A`);

  // clear rows
  for (let i = 0; i < rows; i++) {
    term.write("\x1b[2K");
    if (i < rows - 1) term.write("\x1b[1B");
  }

  // move back up
  if (rows > 1) term.write(`\x1b[${rows - 1}A`);
  term.write("\r");
  writePrompt(term);
  term.write(newInput);
}