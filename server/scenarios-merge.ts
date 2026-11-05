import { prisma } from './db.js';
import { SCENARIOS, Scenario } from './scenarios.js';

/**
 * Возвращает базовый сценарий, на который наложены правки из БД (если есть).
 * Глубокий мерж: если в БД пришёл объект, он заменяет базовый.
 */
export async function getScenarioMerged(id: string): Promise<Scenario | null> {
  const base = SCENARIOS.find(s => s.id === id);
  if (!base) return null;

  const edit = await prisma.scenarioEdit.findUnique({ where: { id } });
  if (!edit) return base;

  return deepMerge(base, edit.data as any) as Scenario;
}

export async function getAllScenariosMerged(): Promise<Scenario[]> {
  const edits = await prisma.scenarioEdit.findMany();
  const map = new Map(edits.map(e => [e.id, e.data as any]));
  return SCENARIOS.map(s => {
    const patch = map.get(s.id);
    return patch ? (deepMerge(s, patch) as Scenario) : s;
  });
}

function deepMerge<T>(base: T, patch: any): T {
  if (patch === null || patch === undefined) return base;

  // Массив массивов: заменяем целиком (это chapters[][], clues[][])
  if (Array.isArray(base) && Array.isArray(patch)) {
    // Если элементы — объекты с id (suspects), мержим по id
    if (
      base.length > 0 &&
      patch.length > 0 &&
      typeof base[0] === 'object' &&
      typeof patch[0] === 'object' &&
      (base[0] as any)?.id
    ) {
      const patchMap = new Map(patch.map((p: any) => [p.id, p]));
      return base.map((b: any) => {
        const p = patchMap.get(b.id);
        return p ? deepMerge(b, p) : b;
      }) as any;
    }
    return patch as any;
  }

  if (typeof base === 'object' && base !== null && typeof patch === 'object') {
    const result: any = { ...base };
    for (const key of Object.keys(patch)) {
      result[key] = deepMerge((base as any)[key], patch[key]);
    }
    return result;
  }
  return patch;
}