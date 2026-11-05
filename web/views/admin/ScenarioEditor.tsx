// web/views/admin/ScenarioEditor.tsx
import { useEffect, useMemo, useState } from 'react';
import { Card, Btn, PrimaryBtn } from '../../ui';
import { FieldEditor, createEmptyLike } from './fields';

type Tab = 'fields' | 'code' | 'files' | 'export';

const TABS: { id: Tab; label: string }[] = [
  { id: 'fields', label: 'Поля' },
  { id: 'code', label: 'Код (JSON)' },
  { id: 'files', label: 'Файлы' },
  { id: 'export', label: 'Экспорт' }
];

// Ключи, которые не показываем в оглавлении/секциях
const HIDDEN_TOP_KEYS = new Set(['_files']);

// Как показывать элементы известных массивов в аккордеоне
const COLLECTION_LABELS: Record<string, (item: any, i: number) => string> = {
  chapters: (c, i) => `Глава ${c.round ?? i + 1}: ${c.title || '—'}`,
  suspects: (s, i) =>
    `${s.name || '—'}${s.role ? ' · ' + s.role : ''} [${s.id || i + 1}]`,
  clues: (c, i) =>
    `[R${c.round ?? '?'}] ${c.name || '—'}${c.type ? ' · ' + c.type : ''}`
};

// Шаблоны для «+ Добавить» (если массив пуст)
const EMPTY_TEMPLATES: Record<string, any> = {
  chapters: { round: 1, title: '', atmosphere: '', text: '', bg: '', audioUrl: '' },
  suspects: {
    id: '',
    name: '',
    role: '',
    icon: '',
    description: '',
    motive: '',
    alibi: '',
    secret: '',
    verdict: '',
    verdictAudioUrl: ''
  },
  clues: { round: 1, icon: '', type: '', name: '', desc: '', audioUrl: '' }
};

// ============================================================
// ROOT
// ============================================================

export function ScenarioEditor({
  scenario,
  setScenario,
  onDownloadTs,
  onReset
}: {
  scenario: any;
  setScenario: (v: any) => void;
  onDownloadTs: () => void;
  onReset: () => void;
}) {
  const [tab, setTab] = useState<Tab>('fields');

  return (
    <Card>
      <div className="flex gap-2 flex-wrap border-b border-line pb-3 mb-4">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              'px-3 py-1.5 rounded-lg text-sm font-medium transition ' +
              (tab === t.id
                ? 'bg-accent text-white'
                : 'bg-panel border border-line hover:bg-panel2')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: tab === 'fields' ? 'block' : 'none' }}>
        <FieldsTab scenario={scenario} setScenario={setScenario} />
      </div>
      <div style={{ display: tab === 'code' ? 'block' : 'none' }}>
        <CodeTab scenario={scenario} setScenario={setScenario} />
      </div>
      <div style={{ display: tab === 'files' ? 'block' : 'none' }}>
        <FilesTab scenario={scenario} setScenario={setScenario} />
      </div>
      <div style={{ display: tab === 'export' ? 'block' : 'none' }}>
        <ExportTab onDownloadTs={onDownloadTs} onReset={onReset} />
      </div>
    </Card>
  );
}

// ============================================================
// FIELDS TAB — оглавление слева + секции справа
// ============================================================

function FieldsTab({
  scenario,
  setScenario
}: {
  scenario: any;
  setScenario: (v: any) => void;
}) {
  const [query, setQuery] = useState('');

  const keys = useMemo(
    () => Object.keys(scenario).filter(k => !HIDDEN_TOP_KEYS.has(k)),
    [scenario]
  );
  const visible = keys.filter(
    k => !query || k.toLowerCase().includes(query.toLowerCase())
  );

  function setKey(k: string, v: any) {
    setScenario({ ...scenario, [k]: v });
  }

  function removeKey(k: string) {
    if (!confirm(`Удалить поле «${k}»?`)) return;
    const copy = { ...scenario };
    delete copy[k];
    setScenario(copy);
  }

  function scrollTo(key: string) {
    const el = document.getElementById(`sec-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // подсветка
      el.classList.add('ring-2', 'ring-accent');
      setTimeout(() => el.classList.remove('ring-2', 'ring-accent'), 900);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5">
      {/* Оглавление */}
      <aside className="md:sticky md:top-3 self-start space-y-1 max-h-[80vh] overflow-y-auto pr-2">
        <div className="mb-2">
          <input
            placeholder="Поиск по ключам…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-panel border border-line rounded px-2 py-1 text-xs outline-none focus:border-accent"
          />
        </div>
        {visible.length === 0 && (
          <div className="text-xs text-muted">Ничего не найдено</div>
        )}
        {visible.map(k => {
          const val = scenario[k];
          const badge = Array.isArray(val) ? `[${val.length}]` : val === null ? '∅' : '';
          return (
            <button
              key={k}
              onClick={() => scrollTo(k)}
              className="w-full text-left flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-panel2 transition"
            >
              <span className="truncate font-mono">{k}</span>
              {badge && <span className="ml-auto text-muted text-[10px]">{badge}</span>}
            </button>
          );
        })}
      </aside>

      {/* Секции */}
      <div className="space-y-6 min-w-0">
        {visible.map(k => (
          <Section
            key={k}
            name={k}
            value={scenario[k]}
            onChange={v => setKey(k, v)}
            onRemove={() => removeKey(k)}
            readonly={k === 'id'}
          />
        ))}
        {visible.length === 0 && (
          <div className="text-muted text-sm">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// SECTION — одна top-level-секция
// ============================================================

function Section({
  name,
  value,
  onChange,
  onRemove,
  readonly
}: {
  name: string;
  value: any;
  onChange: (v: any) => void;
  onRemove: () => void;
  readonly?: boolean;
}) {
  const isCollection = Array.isArray(value) && !!COLLECTION_LABELS[name];
  const kind = Array.isArray(value)
    ? `[${value.length}]`
    : value === null
    ? 'null'
    : typeof value;

  return (
    <section
      id={`sec-${name}`}
      className="border border-line rounded-xl overflow-hidden scroll-mt-3 transition"
    >
      <header className="flex items-center gap-2 px-4 py-2 bg-panel2/40">
        <b className="text-sm uppercase tracking-wider text-accent">{name}</b>
        <span className="text-xs text-muted">{kind}</span>
        {readonly && (
          <span className="text-[10px] text-muted ml-1">(readonly)</span>
        )}
        {!readonly && (
          <button
            onClick={onRemove}
            className="ml-auto text-red-400 hover:text-red-300 px-1"
            title="Удалить поле"
          >
            ×
          </button>
        )}
      </header>

      <div className="p-4">
        {readonly ? (
          <div className="text-sm text-muted font-mono">{JSON.stringify(value)}</div>
        ) : isCollection ? (
          <CollectionEditor name={name} items={value} onChange={onChange} />
        ) : (
          <FieldEditor name={name} value={value} onChange={onChange} />
        )}
      </div>
    </section>
  );
}

// ============================================================
// COLLECTION EDITOR — аккордеон для chapters/suspects/clues
// ============================================================

function CollectionEditor({
  name,
  items,
  onChange
}: {
  name: string;
  items: any[];
  onChange: (v: any[]) => void;
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(items.length ? [0] : []));

  const labelFn = COLLECTION_LABELS[name] || ((item, i) => `${name} #${i + 1}`);

  function toggle(i: number) {
    setOpen(s => {
      const ns = new Set(s);
      ns.has(i) ? ns.delete(i) : ns.add(i);
      return ns;
    });
  }

  function move(from: number, dir: -1 | 1) {
    const to = from + dir;
    if (to < 0 || to >= items.length) return;
    const copy = [...items];
    [copy[from], copy[to]] = [copy[to], copy[from]];
    onChange(copy);
    // при перемещении переносим открытость
    setOpen(s => {
      const ns = new Set<number>();
      s.forEach(i => {
        if (i === from) ns.add(to);
        else if (i === to) ns.add(from);
        else ns.add(i);
      });
      return ns;
    });
  }

  function remove(i: number) {
    if (!confirm(`Удалить «${labelFn(items[i], i)}»?`)) return;
    onChange(items.filter((_, j) => j !== i));
    setOpen(s => {
      const ns = new Set<number>();
      s.forEach(j => {
        if (j < i) ns.add(j);
        else if (j > i) ns.add(j - 1);
      });
      return ns;
    });
  }

  function add() {
    const template =
      EMPTY_TEMPLATES[name] ||
      (items[0] ? createEmptyLike(items[0]) : {});
    const next = [...items, JSON.parse(JSON.stringify(template))];
    onChange(next);
    setOpen(s => new Set([...s, next.length - 1]));
  }

  function expandAll() {
    setOpen(new Set(items.map((_, i) => i)));
  }
  function collapseAll() {
    setOpen(new Set());
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted">
          {items.length} шт.
        </div>
        <div className="flex gap-2">
          <button
            onClick={expandAll}
            className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2"
          >
            Раскрыть все
          </button>
          <button
            onClick={collapseAll}
            className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2"
          >
            Свернуть все
          </button>
          <Btn onClick={add}>+ Добавить</Btn>
        </div>
      </div>

      {items.length === 0 && (
        <div className="text-xs text-muted border border-dashed border-line rounded-lg p-4 text-center">
          Пока пусто — нажми «+ Добавить»
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = open.has(i);
          return (
            <div key={i} className="border border-line rounded-lg overflow-hidden">
              <div className="flex items-center gap-1 px-2 py-1.5 bg-panel2/40">
                <button
                  onClick={() => toggle(i)}
                  className="flex-1 min-w-0 text-left flex items-center gap-2"
                >
                  <span className="text-muted text-xs w-3 shrink-0">
                    {isOpen ? '▾' : '▸'}
                  </span>
                  <b className="text-sm truncate">{labelFn(item, i)}</b>
                </button>
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2 disabled:opacity-30"
                  title="Вверх"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                  className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2 disabled:opacity-30"
                  title="Вниз"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(i)}
                  className="text-xs text-red-400 hover:text-red-300 px-2"
                  title="Удалить"
                >
                  ×
                </button>
              </div>
              {isOpen && (
                <div className="p-3">
                  <FieldEditor
                    name={`${name}[${i}]`}
                    value={item}
                    onChange={nv =>
                      onChange(items.map((v, j) => (j === i ? nv : v)))
                    }
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// CODE TAB
// ============================================================

function CodeTab({
  scenario,
  setScenario
}: {
  scenario: any;
  setScenario: (v: any) => void;
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(scenario, null, 2));
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!touched) setDraft(JSON.stringify(scenario, null, 2));
  }, [scenario, touched]);

  function format() {
    try {
      setDraft(JSON.stringify(JSON.parse(draft), null, 2));
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  }

  function apply() {
    try {
      const parsed = JSON.parse(draft);
      setScenario(parsed);
      setTouched(false);
      setError('');
    } catch (e: any) {
      setError(e.message);
    }
  }

  function resetDraft() {
    setDraft(JSON.stringify(scenario, null, 2));
    setTouched(false);
    setError('');
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap items-center">
        <Btn onClick={format}>Форматировать</Btn>
        <PrimaryBtn onClick={apply}>Применить</PrimaryBtn>
        <Btn onClick={resetDraft}>Сбросить к текущему</Btn>
        {touched && (
          <span className="text-xs text-amber-400">есть неприменённые изменения</span>
        )}
      </div>
      {error && (
        <div className="text-red-400 text-sm font-mono border border-red-500/30 bg-red-500/10 rounded p-2">
          Ошибка парсинга: {error}
        </div>
      )}
      <textarea
        value={draft}
        onChange={e => {
          setDraft(e.target.value);
          setTouched(true);
        }}
        spellCheck={false}
        className="w-full min-h-[500px] bg-panel border border-line rounded-lg p-3 text-xs font-mono outline-none focus:border-accent"
      />
    </div>
  );
}

// ============================================================
// FILES TAB
// ============================================================

function FilesTab({
  scenario,
  setScenario
}: {
  scenario: any;
  setScenario: (v: any) => void;
}) {
  const files: Record<string, string> = scenario._files || {};
  const names = useMemo(() => Object.keys(files).sort(), [files]);
  const [selected, setSelected] = useState<string | null>(names[0] || null);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  function updateFiles(next: Record<string, string>) {
    setScenario({ ...scenario, _files: next });
  }

  function addFile() {
    const name = newName.trim();
    if (!name) return;
    if (files[name] !== undefined) {
      setError('Файл с таким именем уже есть');
      return;
    }
    if (!/^[a-zA-Z0-9._/-]+$/.test(name)) {
      setError('Только буквы, цифры, точка, дефис, слэш и подчёркивание');
      return;
    }
    updateFiles({ ...files, [name]: '' });
    setSelected(name);
    setNewName('');
    setError('');
  }

  function renameFile(oldName: string) {
    const name = (prompt(`Новое имя для «${oldName}»:`, oldName) || '').trim();
    if (!name || name === oldName) return;
    if (files[name] !== undefined) {
      alert('Имя занято');
      return;
    }
    const next: Record<string, string> = {};
    for (const k of Object.keys(files)) next[k === oldName ? name : k] = files[k];
    updateFiles(next);
    setSelected(name);
  }

  function removeFile(name: string) {
    if (!confirm(`Удалить файл «${name}»?`)) return;
    const next = { ...files };
    delete next[name];
    updateFiles(next);
    if (selected === name) setSelected(null);
  }

  function setContent(name: string, content: string) {
    updateFiles({ ...files, [name]: content });
  }

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted">
        Дополнительные текстовые файлы сценария. Хранятся в <code>_files</code> внутри патча
        и попадут в скачиваемый <code>.ts.txt</code> — при вставке в{' '}
        <code>server/scenarios.ts</code> удали поле, если оно мешает типизации.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addFile()}
              placeholder="имя-файла.md"
              className="flex-1 min-w-0 bg-panel border border-line rounded px-2 py-1 text-sm outline-none focus:border-accent"
            />
            <Btn onClick={addFile}>+</Btn>
          </div>
          {error && <div className="text-xs text-red-400">{error}</div>}

          <div className="space-y-1 max-h-[400px] overflow-y-auto">
            {names.length === 0 && (
              <div className="text-xs text-muted">Пока нет файлов</div>
            )}
            {names.map(name => (
              <div
                key={name}
                onClick={() => setSelected(name)}
                className={
                  'flex items-center gap-1 px-2 py-1.5 rounded text-sm cursor-pointer ' +
                  (selected === name
                    ? 'bg-accent/20 border border-accent/60'
                    : 'border border-transparent hover:bg-panel2')
                }
              >
                <span className="flex-1 truncate font-mono text-xs">{name}</span>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    renameFile(name);
                  }}
                  className="text-xs text-muted hover:text-text px-1"
                  title="Переименовать"
                >
                  ✎
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(name);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 px-1"
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          {selected ? (
            <div className="space-y-2">
              <div className="text-xs text-muted font-mono">{selected}</div>
              <textarea
                value={files[selected] ?? ''}
                onChange={e => setContent(selected, e.target.value)}
                spellCheck={false}
                className="w-full min-h-[400px] bg-panel border border-line rounded-lg p-3 text-xs font-mono outline-none focus:border-accent"
              />
            </div>
          ) : (
            <div className="text-muted text-sm border border-dashed border-line rounded-lg p-8 text-center">
              Выбери файл слева или создай новый
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// EXPORT TAB
// ============================================================

function ExportTab({
  onDownloadTs,
  onReset
}: {
  onDownloadTs: () => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="border border-line rounded-xl p-4">
        <h3 className="text-lg mb-2">Зашить в код</h3>
        <p className="text-sm text-muted mb-3">
          Скачивает текущий сценарий (с учётом правок) как <code>.ts.txt</code>.
          Вручную положи содержимое в <code>server/scenarios.ts</code>, заменив объект
          с тем же <code>id</code>.
        </p>
        <Btn onClick={onDownloadTs} className="!bg-amber-500/20 !text-amber-300">
          📦 Скачать .ts
        </Btn>
      </div>

      <div className="border border-line rounded-xl p-4">
        <h3 className="text-lg mb-2">Сбросить к базовой версии</h3>
        <p className="text-sm text-muted mb-3">
          Удаляет сохранённый патч из БД. Все правки будут потеряны безвозвратно.
        </p>
        <Btn onClick={onReset} className="!bg-red-500/20 !text-red-400">
          Сбросить
        </Btn>
      </div>
    </div>
  );
}