import { useState } from 'react';
import { BIZ_BENEFITS } from './data';

export default function PartnerForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    const ph = phone.replace(/\D/g, '');
    if (n.length < 2) {
      setErr('Укажите название ресторана и город');
      return;
    }
    if (ph.length < 10) {
      setErr('Проверьте номер телефона');
      return;
    }
    setErr('');
    setSentName(n.replace(/</g, ''));
    setSent(true);
  }

  return (
    <section id="l-biz" className="pt-28 md:pt-32 scroll-mt-16">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
        <div>
          <span className="text-[12px] tracking-[.22em] uppercase text-lnd-amber font-semibold mb-4 block">
            Ресторанам
          </span>
          <h2 className="font-serif text-[clamp(40px,5.2vw,64px)] leading-none font-semibold text-lnd-cream max-w-[720px]">
            Полный зал <em className="text-lnd-amber font-medium">в будний вечер</em>
          </h2>

          <ul className="list-none p-0 mt-9 grid gap-4.5">
            {BIZ_BENEFITS.map((b, i) => (
              <li key={i} className="flex gap-3.5 text-[15px] leading-snug text-[#cdbca8]">
                <i className="fa-solid fa-check text-lnd-amber mt-1 text-[13px]" />
                <span>
                  <b className="text-lnd-cream font-semibold">{b.bold}</b>
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 md:p-9 rounded-[20px] bg-[#f1e4cb] text-[#2a1c14]">
          {sent ? (
            <div className="text-center py-8">
              <i className="fa-solid fa-envelope-circle-check text-[36px] text-[#b86a1c]" />
              <h3 className="font-serif text-[34px] mt-4 mb-3 text-[#1d120c]">
                Заявка принята
              </h3>
              <p className="text-[14px] leading-relaxed text-[#6b5140] m-0">
                Спасибо! Менеджер свяжется с вами в течение дня и расскажет, как запустить
                игры в {sentName}.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-[34px] m-0 mb-2 text-[#1d120c]">
                Стать партнёром
              </h3>
              <p className="text-[14px] leading-relaxed text-[#6b5140] mt-0 mb-6">
                Оставьте контакты — расскажем об условиях и проведём пробную игру для команды.
              </p>

              <form onSubmit={submit} noValidate>
                <label className="block mb-3.5">
                  <span className="block text-[12px] font-semibold tracking-[.06em] mb-2 opacity-75">
                    Ресторан и город
                  </span>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="«Гранат», Москва"
                    className="w-full px-4 py-3.5 rounded-[10px] border border-[rgba(42,28,20,.2)] bg-[#fbf3e3] text-[#1d120c] text-[15px] outline-none focus:border-[#b86a1c] transition"
                  />
                </label>

                <label className="block mb-3.5">
                  <span className="block text-[12px] font-semibold tracking-[.06em] mb-2 opacity-75">
                    Телефон
                  </span>
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+7 900 000-00-00"
                    inputMode="tel"
                    className="w-full px-4 py-3.5 rounded-[10px] border border-[rgba(42,28,20,.2)] bg-[#fbf3e3] text-[#1d120c] text-[15px] outline-none focus:border-[#b86a1c] transition"
                  />
                </label>

                <div className="min-h-[20px] text-[13px] text-[#c0452a] mt-1 mb-1">
                  {err}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 rounded-xl bg-lnd-amber text-[#1a0f0a] font-bold text-[15px] inline-flex items-center justify-center gap-2.5 hover:bg-[#ffb85a] transition mt-2"
                >
                  Отправить заявку
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}