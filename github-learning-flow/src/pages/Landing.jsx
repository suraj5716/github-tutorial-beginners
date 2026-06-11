import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GitBranch, BookOpen, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import { tutorials } from '../data/tutorials';

function LandingPreview() {
  const flowRef = useRef(null);

  const previewNodes = tutorials.slice(0, 5).flatMap((t, i) =>
    t.nodes.slice(0, 2).map((n, j) => ({
      id: `landing-${t.id}-${n.id}`,
      type: 'default',
      position: { x: 100 + i * 220 + (j % 2) * 80, y: 60 + j * 120 },
      data: {
        label: n.label,
      },
      style: {
        background: 'var(--color-surface)',
        color: 'var(--color-text)',
        border: `1.5px solid ${t.color}40`,
        borderRadius: '12px',
        padding: '10px 16px',
        fontSize: '12px',
        fontWeight: 500,
        boxShadow: `0 2px 8px ${t.color}10`,
      },
    }))
  );

  const previewEdges = previewNodes.slice(0, -1).map((n, i) => ({
    id: `le-${i}`,
    source: n.id,
    target: previewNodes[i + 1].id,
    animated: true,
    style: { stroke: '#94a3b8', strokeWidth: 1.5 },
    markerEnd: { type: MarkerType.ArrowClosed },
  }));

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        ref={flowRef}
        nodes={previewNodes}
        edges={previewEdges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background gap={25} color="var(--color-border)" />
      </ReactFlow>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
              style={{
                background: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-primary)20',
              }}
            >
              <Shield size={12} />
              Interactive learning platform
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Learn GitHub{' '}
              <span style={{ color: 'var(--color-primary)' }}>Visually</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl" style={{ color: 'var(--color-text-secondary)' }}>
                The Easiest Way for Beginners
              </span>
            </h1>

            <p className="text-base md:text-lg mt-4 mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Master Git and GitHub through interactive diagrams, step-by-step workflows,
              and visual learning — no more staring at walls of text.
            </p>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all"
                style={{ background: 'var(--color-primary)' }}
              >
                Start Learning
                <ArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/workspace')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <GitBranch size={16} />
                Explore Flows
              </motion.button>
            </div>

            <div className="flex items-center gap-6 mt-8 pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium"
                    style={{
                      background: 'var(--color-surface)',
                      borderColor: 'var(--color-bg)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {['JS', 'TS', 'PY', 'RB'][i]}
                  </div>
                ))}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-text)' }}>14 topics</span> — Interactive diagrams
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: 'var(--color-border)',
                background: 'var(--color-surface)',
                height: '420px',
              }}
            >
              <div
                className="px-4 py-2 border-b text-xs font-medium flex items-center gap-2"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="ml-2">Interactive Preview</span>
              </div>
              <LandingPreview />
            </div>

            <div
              className="absolute -bottom-3 -right-3 -z-10 w-full h-full rounded-2xl opacity-30"
              style={{
                background: `linear-gradient(135deg, var(--color-primary)20, transparent)`,
              }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 md:mt-24"
        >
          {[
            { icon: GitBranch, label: 'Interactive Diagrams', desc: 'Visual workflows for every concept' },
            { icon: BookOpen, label: 'Step-by-Step', desc: 'Learn at your own pace' },
            { icon: Shield, label: 'Beginner Friendly', desc: 'No prior knowledge needed' },
            { icon: ArrowRight, label: 'Practical Focus', desc: 'Real commands and examples' },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="p-4 rounded-xl border transition-all"
              style={{
                background: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <Icon size={20} style={{ color: 'var(--color-primary)' }} />
              <div className="mt-2 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{label}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
