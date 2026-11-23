/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

export default function App() {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const handleVerClick = () => {
    window.location.href = '/HTML/index.html';
  };

  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center justify-between px-6 py-12 select-none">
      <div aria-hidden="true" />

      <time
        dateTime={now.toISOString()}
        className="font-clock text-6xl sm:text-8xl md:text-9xl font-light tracking-tight text-neutral-950 tabular-nums"
      >
        {hours}:{minutes}:{seconds}
      </time>

      <div className="pb-4">
        <button
          type="button"
          onClick={handleVerClick}
          className="min-h-[44px] min-w-[112px] px-8 py-2.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-lg hover:border-neutral-900 hover:bg-neutral-50 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 cursor-pointer whitespace-nowrap shrink-0"
        >
          ver
        </button>
      </div>
    </main>
  );
}
