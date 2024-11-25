import { create } from 'zustand';

interface DevToolsState {
  isExpanded: boolean;
  useMockApi: boolean;
  lastRequest: any;
  lastResponse: any;
  lastError: any;
  toggleExpanded: () => void;
  toggleMockApi: () => void;
  setLastRequest: (request: any) => void;
  setLastResponse: (response: any) => void;
  setLastError: (error: any) => void;
  resetLogs: () => void;
}

export const useDevTools = create<DevToolsState>((set) => ({
  isExpanded: false,
  useMockApi: true,
  lastRequest: null,
  lastResponse: null,
  lastError: null,
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  toggleMockApi: () => set((state) => ({ useMockApi: !state.useMockApi })),
  setLastRequest: (request) => set({ lastRequest: request }),
  setLastResponse: (response) => set({ lastResponse: response }),
  setLastError: (error) => set({ lastError: error }),
  resetLogs: () => set({ lastRequest: null, lastResponse: null, lastError: null }),
}));