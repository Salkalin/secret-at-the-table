// web/views/admin/fields.tsx
// Extracted 1:1 from Admin.tsx + small improvement to createEmptyLike.

const READONLY_KEYS = new Set(['id']);

export function JsonEditor({
  value,
  onChange,
  onRemoveField
}: {
  value: any;
  onChange: (v: any) => void;
  onRemoveField?: (key: string) => void;
}) {
  return (
    <div className="space-y-4">
      {Object.keys(value).map(key => {
        if (READONLY_KEYS.has(key)) {
          return (
            <div key={key} className="text-xs text-muted">
              <b>{key}:</b> {JSON.stringify(value[key])}{' '}
              <em>(не редактируется)</em>
            </div>
          );
        }
        return (
          <div key={key} className="relative">
            {onRemoveField && (
              <button
                onClick={() => {
                  if (confirm(`Удалить поле «${key}»?`)) onRemoveField(key);
                }}
                className="absolute right-0 top-0 text-red-400 hover:text-red-300 z-10 px-2"
                title="Удалить поле"
              >
                ×
              </button>
            )}
            <FieldEditor
              name={key}
              value={value[key]}
              onChange={(nv) => onChange({ ...value, [key]: nv })}
            />
          </div>
        );
      })}
    </div>
  );
}

export function FieldEditor({
  name,
  value,
  onChange
}: {
  name: string;
  value: any;
  onChange: (v: any) => void;
}) {
  if (typeof value === 'string') {
    const isLong = value.length > 80;
    return (
      <div>
        <label className="block text-[11px] uppercase tracking-wider text-accent font-bold mb-1.5">
          {name}
          {name === 'secret' && (
            <span className="ml-2 text-[10px] normal-case text-muted tracking-normal">
              (не показывается игрокам)
            </span>
          )}
        </label>
        {isLong ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={Math.min(12, Math.max(3, Math.ceil(value.length / 80)))}
            className="w-full bg-panel border border-line rounded-lg px-3 py-2 text-text outline-none focus:border-accent text-sm font-mono"
          />
        ) : (
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-panel border border-line rounded-lg px-3 py-2 text-text outline-none focus:border-accent text-sm"
          />
        )}
      </div>
    );
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <label className="text-[11px] uppercase tracking-wider text-accent font-bold">
          {name}
        </label>
        {typeof value === 'boolean' ? (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4"
          />
        ) : (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="bg-panel border border-line rounded px-2 py-1 text-text w-32"
          />
        )}
      </div>
    );
  }

  if (Array.isArray(value)) {
    const isStringArray = value.every((v) => typeof v === 'string');

    if (isStringArray) {
      const move = (from: number, dir: -1 | 1) => {
        const to = from + dir;
        if (to < 0 || to >= value.length) return;
        const copy = [...value];
        [copy[from], copy[to]] = [copy[to], copy[from]];
        onChange(copy);
      };
      return (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-[11px] uppercase tracking-wider text-accent font-bold">
              {name} <span className="text-muted">({value.length})</span>
            </label>
            <button
              onClick={() => onChange([...value, ''])}
              className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2"
            >
              + добавить
            </button>
          </div>
          <div className="space-y-2 pl-3 border-l-2 border-line">
            {value.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-muted w-6 text-right">{i + 1}.</span>
                <input
                  value={item}
                  onChange={(e) => {
                    const copy = [...value];
                    copy[i] = e.target.value;
                    onChange(copy);
                  }}
                  className="flex-1 bg-panel border border-line rounded-lg px-3 py-1.5 text-text outline-none focus:border-accent text-sm font-mono"
                />
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
                  disabled={i === value.length - 1}
                  className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2 disabled:opacity-30"
                  title="Вниз"
                >
                  ↓
                </button>
                <button
                  onClick={() => onChange(value.filter((_, j) => j !== i))}
                  className="text-xs px-2 py-1 text-red-400 hover:text-red-300"
                  title="Удалить"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-[11px] uppercase tracking-wider text-accent font-bold">
            {name} <span className="text-muted">({value.length})</span>
          </label>
          <button
            onClick={() => onChange([...value, createEmptyLike(value[0])])}
            className="text-xs px-2 py-1 rounded border border-line bg-panel hover:bg-panel2"
          >
            + добавить
          </button>
        </div>
        <div className="space-y-3 pl-3 border-l-2 border-line">
          {value.map((item, i) => (
            <div key={i} className="relative">
              <button
                onClick={() => {
                  if (confirm(`Удалить элемент ${i}?`))
                    onChange(value.filter((_, j) => j !== i));
                }}
                className="absolute right-0 top-0 text-xs text-red-400 hover:text-red-300 z-10 px-2"
              >
                ×
              </button>
              <FieldEditor
                name={`${name}[${i}]`}
                value={item}
                onChange={(nv) => onChange(value.map((v, j) => (j === i ? nv : v)))}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    const addField = () => {
      const key = prompt('Имя нового поля (например, verdict):');
      if (!key) return;
      if (key in value) {
        alert('Такое поле уже есть');
        return;
      }
      onChange({ ...value, [key]: '' });
    };
    const removeField = (k: string) => {
      const copy = { ...value };
      delete copy[k];
      onChange(copy);
    };

    return (
      <div className="border border-line rounded-lg p-3 bg-panel/40">
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-[11px] uppercase tracking-wider text-accent font-bold">
            {name}
          </label>
          <button
            onClick={addField}
            className="text-xs px-2 py-0.5 rounded border border-line bg-panel hover:bg-panel2"
          >
            + поле
          </button>
        </div>
        <JsonEditor value={value} onChange={onChange} onRemoveField={removeField} />
      </div>
    );
  }

  return null;
}

export function createEmptyLike(obj: any): any {
  if (Array.isArray(obj)) return [];
  if (typeof obj === 'string') return '';
  if (typeof obj === 'number') return 0;
  if (typeof obj === 'boolean') return false;
  if (obj && typeof obj === 'object') {
    const out: any = {};
    for (const k of Object.keys(obj)) out[k] = createEmptyLike(obj[k]);
    return out;
  }
  // undefined / null — assume we are adding to an object array
  return {};
}