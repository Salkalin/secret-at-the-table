// Общие помощники для анимаций фоновых сцен (см. HtmlScene.tsx).

const NS = 'http://www.w3.org/2000/svg';

/** Создать SVG-элемент с атрибутами и (опционально) добавить в parent. */
export function svgEl(tag: string, attrs: Record<string, any>, parent?: Element): SVGElement {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (parent) parent.appendChild(e);
  return e as SVGElement;
}

export const rnd = (a: number, b: number) => a + Math.random() * (b - a);
