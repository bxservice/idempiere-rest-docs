import React, { useEffect, useRef, useState, type ReactNode } from 'react';
// Docusaurus 3 exports useDoc from the docs plugin's client entry. Check this
// import when upgrading Docusaurus.
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

type Status = 'idle' | 'copied' | 'failed';

async function writeToClipboard(textPromise: Promise<string>): Promise<void> {
  if (typeof ClipboardItem !== 'undefined') {
    try {
      // Passing a promise keeps the user gesture alive in Safari.
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': textPromise.then(
            (t) => new Blob([t], { type: 'text/plain' })
          ),
        }),
      ]);
      return;
    } catch {
      // Fall through to writeText.
    }
  }
  await navigator.clipboard.writeText(await textPromise);
}

// docusaurus-plugin-llms writes a Markdown copy of each page to <permalink>.md
// at build time. The files do not exist in `npm start`, so the buttons are
// hidden there.
export default function CopyMarkdown(): ReactNode {
  const { metadata } = useDoc();
  const [status, setStatus] = useState<Status>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  const mdUrl = `${metadata.permalink}.md`;

  const copy = async () => {
    const text = fetch(mdUrl).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.text();
    });
    try {
      await writeToClipboard(text);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const label =
    status === 'copied'
      ? 'Copied'
      : status === 'failed'
        ? 'Copy failed'
        : 'Copy page as Markdown';

  return (
    <div className={styles.bar}>
      <button type="button" className={styles.button} onClick={copy}>
        {label}
      </button>
      <a className={styles.button} href={mdUrl} target="_blank" rel="noopener">
        View as Markdown
      </a>
    </div>
  );
}
