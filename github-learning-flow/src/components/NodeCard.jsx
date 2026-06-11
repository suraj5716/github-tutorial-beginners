import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

function NodeCard({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(data.label);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const typeColors = {
    basics: '#3b82f6',
    setup: '#6366f1',
    commands: '#10b981',
    advanced: '#f59e0b',
    errors: '#ef4444',
  };

  const accentColor = data.color || typeColors[data.category] || '#3b82f6';

  return (
    <div
      className="rounded-xl shadow-lg cursor-grab active:cursor-grabbing min-w-[200px] max-w-[260px] transition-all duration-200"
      style={{
        background: 'var(--color-surface)',
        border: `1.5px solid ${accentColor}20`,
        boxShadow: `0 4px 12px ${accentColor}10`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Handle type="target" position={Position.Top} style={{ background: accentColor, width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: accentColor, width: 8, height: 8 }} />

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
              style={{ background: accentColor }}
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                {data.label}
              </div>
              {data.tutorialTitle && (
                <div className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--color-text-secondary)' }}>
                  {data.tutorialTitle}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={copyToClipboard}
              className="p-1 rounded-md transition-all hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
              title="Copy label"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
            <button
              className="p-1 rounded-md transition-all hover:opacity-70"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {data.desc && (
          <div className="mt-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            {data.desc}
          </div>
        )}

        {expanded && data.command && (
          <div
            className="mt-2 p-2 rounded-lg text-xs font-mono"
            style={{
              background: 'var(--color-bg)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span style={{ color: 'var(--color-text-secondary)' }}>Command</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(data.command);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="p-0.5 rounded transition-all hover:opacity-70"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {copied ? <Check size={10} /> : <Copy size={10} />}
              </button>
            </div>
            <code style={{ color: accentColor }}>{data.command}</code>
          </div>
        )}
      </div>

      <div
        className="h-1 rounded-b-xl"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }}
      />
    </div>
  );
}

export default memo(NodeCard);
