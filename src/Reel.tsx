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
