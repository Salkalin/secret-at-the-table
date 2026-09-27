export const Btn = ({ children, className = '', ...p }: any) => (
  <button
    {...p}
    className={'px-5 py-3 rounded-lg bg-panel border border-line hover:bg-panel2 transition text-text font-medium ' + className}
  >
    {children}
  </button>
);

export const PrimaryBtn = ({ children, className = '', ...p }: any) => (
  <button
    {...p}
    className={'px-5 py-3 rounded-lg bg-accent hover:opacity-90 text-white font-medium disabled:opacity-40 ' + className}
  >
    {children}
  </button>
);

export const Card = ({ children, className = '' }: any) => (
  <div className={'bg-panel border border-line rounded-xl p-5 ' + className}>{children}</div>
);

export const Input = (p: any) => (
  <input
    {...p}
    className="w-full bg-panel border border-line rounded-lg px-4 py-3 text-text outline-none focus:border-accent"
  />
);
