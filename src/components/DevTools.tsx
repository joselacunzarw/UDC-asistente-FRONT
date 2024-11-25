import React from 'react';
import { useDevTools } from '../store/devToolsStore';
import { X, Maximize2, Minimize2, Database, Globe, RefreshCw } from 'lucide-react';

export const DevTools: React.FC = () => {
  const { 
    isExpanded,
    toggleExpanded,
    lastRequest,
    lastResponse,
    lastError,
    useMockApi,
    toggleMockApi,
    resetLogs
  } = useDevTools();

  return (
    <div className={`fixed bottom-0 right-0 bg-gray-900 text-white transition-all duration-300 ${
      isExpanded ? 'w-96 h-96' : 'w-auto h-auto'
    }`}>
      <div className="flex items-center justify-between p-2 bg-gray-800">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMockApi}
            className={`p-1 rounded ${useMockApi ? 'text-yellow-400' : 'text-blue-400'}`}
            title={useMockApi ? 'Using Mock API' : 'Using Real API'}
          >
            {useMockApi ? <Database className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          </button>
          <span className="text-xs font-mono">
            {useMockApi ? 'Mock API' : 'Real API'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetLogs}
            className="p-1 hover:text-gray-300"
            title="Limpiar registros"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleExpanded}
            className="p-1 hover:text-gray-300"
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 h-[calc(100%-40px)] overflow-auto">
          <div className="space-y-4">
            {lastError && (
              <div className="bg-red-900/50 p-3 rounded border border-red-700">
                <h3 className="text-red-400 text-sm font-semibold mb-1">Error</h3>
                <pre className="text-xs font-mono text-red-300 whitespace-pre-wrap">
                  {JSON.stringify(lastError, null, 2)}
                </pre>
              </div>
            )}

            {lastRequest && (
              <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                <h3 className="text-blue-400 text-sm font-semibold mb-1">Last Request</h3>
                <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(lastRequest, null, 2)}
                </pre>
              </div>
            )}

            {lastResponse && (
              <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                <h3 className="text-green-400 text-sm font-semibold mb-1">Last Response</h3>
                <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(lastResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};