// web/views/admin/ScenariosTab.tsx
import { useEffect, useMemo, useState } from 'react';
import { api } from '../../api';
import { Card, Btn, PrimaryBtn } from '../../ui';
import { ScenarioEditor } from './ScenarioEditor';

type ScenarioListItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  hasEdit: boolean;
  updatedAt: string | null;
};

export function ScenariosTab() {
  const [list, setList] = useState<ScenarioListItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scenario, setScenario] = useState<any>(null);
  const [originalSnapshot, setOriginalSnapshot] = useState<string | null>(null);
  const [hasEdit, setHasEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [pendingSelect, setPendingSelect] = useState<string | null>(null);

  const dirty = useMemo(() => {
    if (!scenario || !originalSnapshot) return false;
    return JSON.stringify(scenario) !== originalSnapshot;
  }, [scenario, originalSnapshot]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  async function loadList() {
    const l = await api<ScenarioListItem[]>('/api/admin/scenarios');
    setList(l);
  }
  useEffect(() => {
    loadList();
  }, []);

  async function openScenario(id: string) {
    setSelectedId(id);
    setMsg('');
    const r = await api<{ scenario: any; hasEdit: boolean }>(
      `/api/admin/scenarios/${id}`
    );
    const copy = JSON.parse(JSON.stringify(r.scenario));
    setScenario(copy);
    setOriginalSnapshot(JSON.stringify(copy));
    setHasEdit(r.hasEdit);
  }

  function requestOpen(id: string) {
    if (id === selectedId) return;
    if (dirty) {
      setPendingSelect(id);
      return;
    }
    openScenario(id);
  }

  async function save() {
    if (!selectedId || !scenario) return;
    setSaving(true);
    setMsg('');
    try {
      await api(`/api/admin/scenarios/${selectedId}`, {
        method: 'POST',
        body: JSON.stringify({ data: scenario })
      });
      setOriginalSnapshot(JSON.stringify(scenario));
      setMsg('Сохранено');
      setHasEdit(true);
      loadList();
    } catch (e: any) {
      setMsg('Ошибка: ' + e.message);
    } finally {
      setSaving(false);
    }
  }

  async function reset() {
    if (!selectedId) return;
    if (!confirm('Сбросить все правки к базовой версии?')) return;
    setSaving(true);
    try {
      await api(`/api/admin/scenarios/${selectedId}`, { method: 'DELETE' });
      const r = await api<{ scenario: any; hasEdit: boolean }>(
        `/api/admin/scenarios/${selectedId}`
      );
      const copy = JSON.parse(JSON.stringify(r.scenario));
      setScenario(copy);
      setOriginalSnapshot(JSON.stringify(copy));
      setHasEdit(false);
      setMsg('Сброшено');
      loadList();
    } finally {
      setSaving(false);
    }
  }

  async function downloadTs() {
    if (!selectedId) return;
    const res = await fetch(`/api/admin/scenarios/${selectedId}/flush`, {
      credentials: 'include'
    });
    if (!res.ok) {
      alert('Ошибка: не удалось сгенерировать файл');
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedId}.ts.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyJson() {
    if (!scenario) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(scenario, null, 2));
      setMsg('JSON скопирован в буфер');
    } catch {
      setMsg('Не удалось скопировать');
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
      {/* Список */}
      <div className="space-y-2">
        {list.map(s => (
          <button
            key={s.id}
            onClick={() => requestOpen(s.id)}
            className={
              'w-full text-left p-4 rounded-xl border transition ' +
              (selectedId === s.id
                ? 'border-accent bg-panel2'
                : 'border-line bg-panel hover:border-accent/50')
            }
          >
            <div className="flex items-center gap-2 mb-1">
              <i className={`fa-solid ${s.icon} text-accent`} />
              <b className="font-serif text-lg">{s.title}</b>
              {s.hasEdit && (
                <span className="text-[10px] bg-amber-500 text-black px-1.5 rounded">
                  изм.
                </span>
              )}
            </div>
            <div className="text-xs text-muted line-clamp-2">{s.description}</div>
          </button>
        ))}
      </div>

      {/* Редактор */}
      <div>
        {!scenario && (
          <Card>
            <div className="text-muted text-center py-16">
              <i className="fa-solid fa-arrow-left text-2xl mb-3 block" />
              Выберите сценарий слева
            </div>
          </Card>
        )}

        {scenario && (
          <>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <h2 className="text-2xl m-0">{scenario.title}</h2>
              {hasEdit && (
                <span className="text-xs text-amber-400">правки в БД</span>
              )}
              {dirty && (
                <span className="text-xs text-sky-400">● не сохранено</span>
              )}
              <div className="ml-auto flex gap-2 flex-wrap">
                <Btn onClick={copyJson} className="!bg-sky-500/20 !text-sky-300">
                  📋 Копировать JSON
                </Btn>
                <Btn onClick={reset} className="!bg-red-500/20 !text-red-400">
                  Сбросить
                </Btn>
                <PrimaryBtn onClick={save} disabled={saving || !dirty}>
                  {saving ? 'Сохранение…' : 'Сохранить'}
                </PrimaryBtn>
              </div>
            </div>

            {msg && <div className="text-sm text-amber-400 mb-3">{msg}</div>}

            <ScenarioEditor
              scenario={scenario}
              setScenario={setScenario}
              onDownloadTs={downloadTs}
              onReset={reset}
            />
          </>
        )}
      </div>

      {/* Модалка несохранённых правок */}
      {pendingSelect && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-panel border border-line rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg mb-2">Несохранённые правки</h3>
            <p className="text-sm text-muted mb-4">
              В текущем сценарии есть изменения, которые не сохранены. Переключиться
              и потерять их?
            </p>
            <div className="flex gap-2 justify-end">
              <Btn onClick={() => setPendingSelect(null)}>Отмена</Btn>
              <PrimaryBtn
                onClick={() => {
                  const id = pendingSelect;
                  setPendingSelect(null);
                  openScenario(id);
                }}
              >
                Потерять и переключиться
              </PrimaryBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}