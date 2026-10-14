import { AbsoluteFill } from 'remotion';
import type { ReelProps } from './Reel';

export const Cover: React.FC<ReelProps> = ({ scenes }) => {
  const first = scenes[0];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #020617, #0f172a)',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            width: 120,
            height: 10,
            borderRadius: 10,
            background: first?.color ?? '#2563eb'
          }}
        />

        <h1 style={{ fontSize: 92, lineHeight: 1.1, margin: 0 }}>
          {first?.title ?? 'Заголовок'}
        </h1>

        <p style={{ fontSize: 48, lineHeight: 1.35, margin: 0, opacity: 0.85 }}>
          {first?.subtitle ?? 'Подзаголовок'}
        </p>
      </div>
    </AbsoluteFill>
  );
};