import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeCard from './NodeCard';
import { getFlowForTutorial } from '../data/tutorials';
import { useApp } from '../context/AppContext';

const nodeTypes = { tutorialNode: NodeCard };

export default function FlowDiagram({ tutorialId }) {
  const { searchQuery } = useApp();
  const flowData = useMemo(() => getFlowForTutorial(tutorialId), [tutorialId]);

  const initialNodes = useMemo(() => {
    if (!flowData) return [];
    return flowData.nodes.map((node, i) => ({
      ...node,
      position: {
        x: 80 + i * 240,
        y: 80 + (i % 2 === 0 ? 0 : 60),
      },
    }));
  }, [flowData]);

  const initialEdges = useMemo(() => {
    if (!flowData) return [];
    return flowData.edges;
  }, [flowData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [expanded, setExpanded] = useState(false);

  const onConnect = useCallback(() => {}, []);

  return (
    <div className="w-full" style={{ height: expanded ? '600px' : '400px' }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: flowData?.nodes?.[0]?.data?.color || '#3b82f6' }}
          />
          <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
            Flow Visualization
          </span>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      <div
        className="rounded-xl overflow-hidden border transition-all duration-300"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-bg)',
          height: expanded ? '560px' : '360px',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#94a3b8', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed },
          }}
        >
          <Controls showInteractive={false} />
          <MiniMap
            nodeStrokeWidth={3}
            style={{
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
            }}
          />
          <Background gap={20} color="var(--color-border)" />
        </ReactFlow>
      </div>
    </div>
  );
}
