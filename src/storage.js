const STORAGE_KEY = 'quick_study_sessions_v1';

export const loadSessions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    const [latest] = parsed;
    if (latest) {
        return parsed;
    }
    return [];
  } catch (err) {
    console.warn(`Failed to read sessions: ${err.message}`);
    return [];
  }
};

export const saveSession = ({ mode, minutes }) => {
  const existing = loadSessions();
  const endedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const updated = [{ mode, minutes, endedAt }, ...existing].slice(0, 12);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
