import { useAppContext } from '../context/AppProvider';

export function useSessions() {
  const { sessions, refreshSessions, createSession, updateSession, deleteSession } = useAppContext();
  return { sessions, refreshSessions, createSession, updateSession, deleteSession };
}
