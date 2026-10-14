#!/usr/bin/env bash
set -e

mkdir -p src

cat > src/index.ts <<'EOF'
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
EOF

cat > src/Root.tsx <<'EOF'
import { Composition } from 'remotion';
import { z } from 'zod';
import { Reel, type ReelProps } from './Reel';
import { Cover } from './Cover';

export const reelSchema = z.object({
  scenes: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      color: z.string()
    })
  )
});

const defaultProps: ReelProps = {
  scenes: [
    {
      title: 'Универсальный Reels',
      subtitle: 'Измени сцены в интерфейсе или через content.json',
      color: '#2563eb'
    }
  ]
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Reel"
        component={Reel}
        schema={reelSchema}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      <Composition
        id="Cover"
        component={Cover}
        schema={reelSchema}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};
EOF

cat > src/Reel.tsx <<'EOF'
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';

export type ReelProps = {
  scenes: {
    title: string;
    subtitle: string;
    color: string;
  }[];
};

export const Reel: React.FC<ReelProps> = ({ scenes }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sceneDuration = Math.ceil(durationInFrames / scenes.length);
  const index = Math.min(
    scenes.length - 1,
    Math.floor(frame / sceneDuration)
  );
  const localFrame = frame - index * sceneDuration;

  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 18, stiffness: 120 }
  });

  const progress = frame / durationInFrames;

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
      <div
        style={{
          width: '100%',
          transform: `scale(${0.94 + enter * 0.06})`,
          opacity: interpolate(localFrame, [0, 12], [0, 1]),
          display: 'flex',
          flexDirection: 'column',
          gap: 28
        }}
      >
        <div
          style={{
            width: 96,
            height: 8,
            borderRadius: 8,
            background: scenes[index].color
          }}
        />

        <h1 style={{ fontSize: 82, lineHeight: 1.1, margin: 0 }}>
          {scenes[index].title}
        </h1>

        <p style={{ fontSize: 46, lineHeight: 1.35, margin: 0, opacity: 0.85 }}>
          {scenes[index].subtitle}
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 80,
          right: 80,
          height: 10,
          borderRadius: 10,
          background: 'rgba(255,255,255,0.15)'
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: '100%',
            borderRadius: 10,
            background: '#38bdf8'
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
EOF

cat > src/Cover.tsx <<'EOF'
import React from 'react';
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 28
        }}
      >
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
EOF

cat > content.json <<'EOF'
{
  "scenes": [
    {
      "title": "Фишинг: как не потерять аккаунт",
      "subtitle": "Мошенники маскируются под банки, сервисы и знакомых",
      "color": "#2563eb"
    },
    {
      "title": "Проверяй адрес сайта",
      "subtitle": "Смотри на домен: bank-secure-login.com — не официальный сайт банка",
      "color": "#dc2626"
    },
    {
      "title": "Не сообщай коды",
      "subtitle": "Никакой сервис не попросит пароль или код подтверждения в сообщении",
      "color": "#16a34a"
    }
  ]
}
EOF

cat > .gitignore <<'EOF'
node_modules/
out/
.remotion/
.env
*.log
EOF

npm install zod@3.23.8

echo "Готово. Запусти: npm start"