import copy from "copy-to-clipboard";
import { useState } from "react"

export interface copierOptions {
  debug?: boolean;
  message?: string;
  format?: string; // MIME type
  onCopy?: (clipboardData: object) => void;
}

export type UseCopyToClipboardReturn = [
  (text: string, options: copierOptions) => void,
  { value: string | undefined; success: boolean }
];

function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [value, setValue] = useState<string | undefined>();
  const [success, setSuccess] = useState<boolean>(() => false);
  const copyToClipboard = (text: string, options: copierOptions) => {
    const result = copy(text, options);
    if (result) {
      setValue(() => text);
      setSuccess(() => true);
    }
  }

  return [copyToClipboard, { value, success }];
}

export default useCopyToClipboard