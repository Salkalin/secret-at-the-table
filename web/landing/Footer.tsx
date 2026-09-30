import { FOOTER } from './data';

export default function Footer() {
  return (
    <footer className="flex justify-between items-center gap-5 flex-wrap mt-20 pt-8 border-t border-lnd-line text-[13px] text-lnd-muted">
      <span>{FOOTER.copyright}</span>
      <div className="flex gap-2.5">
        {FOOTER.social.map((s, i) => (
          <a
            key={i}
            href={s.href}
            aria-label={s.label}
            className="w-[38px] h-[38px] rounded-[10px] border border-lnd-line grid place-items-center hover:bg-white/[.07] transition"
          >
            <i className={`fa-brands ${s.icon} text-lnd-text text-[14px]`} />
          </a>
        ))}
      </div>
    </footer>
  );
}