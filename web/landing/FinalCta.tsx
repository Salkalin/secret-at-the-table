import { FINAL } from './data';

type Props = {
  onCabinet: () => void;
};

export default function FinalCta({ onCabinet }: Props) {
  return (
    <div className="mt-28 md:mt-32 p-14 md:p-24 rounded-[26px] text-center border border-lnd-line bg-[radial-gradient(ellipse_at_50%_0%,rgba(242,165,65,.14),transparent_65%),rgba(22,14,11,.9)]">
      <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold">
        {FINAL.kicker}
      </span>
      <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream my-4 mx-auto max-w-[720px]">
        {FINAL.titleLine1}{' '}
        <em className="text-lnd-amber font-medium">{FINAL.titleLine2}</em>?
      </h2>
      <p className="max-w-[480px] mx-auto mt-5 mb-8 text-[#cdbca8] leading-relaxed">
        {FINAL.text}
      </p>
      <button
        onClick={onCabinet}
        className="px-7 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center gap-3 hover:-translate-y-0.5 hover:bg-[#ffb85a] transition shadow-[0_10px_40px_-12px_rgba(242,165,65,0.7)]"
      >
        <i className="fa-solid fa-right-to-bracket" />
        {FINAL.cta}
      </button>
    </div>
  );
}