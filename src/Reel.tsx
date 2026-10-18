import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig
} from 'remotion';

export type ReelProps = {
  durationInSeconds: number;
  transitionFrames: number;
  scenes: {
    title: string;
    subtitle: string;
    color: string;
  }[];
};

export const Reel: React.FC<ReelProps> = ({
  durationInSeconds,
  transitionFrames,
  scenes
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = durationInSeconds * fps;
  const sceneDuration = totalFrames / scenes.length;

  const index = Math.min(
    scenes.length - 1,
    Math.floor(frame / sceneDuration)
  );

  const localFrame = frame - index * sceneDuration;

  const enter = spring({
    frame: localFrame,
    fps,
    config: {
      damping: 18,
      stiffness: 120
    }
  });

  const fade = transitionFrames > 0 ? transitionFrames : 1;

  const opacity = interpolate(
    localFrame,
    [0, fade, sceneDuration - fade, sceneDuration],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  const scale = interpolate(
    localFrame,
    [0, sceneDuration],
    [1.04, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  const progress = frame / totalFrames;
  const scene = scenes[index];

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
      <Audio
        src={staticFile('music.mp3')}
        volume={0.12}
      />

      <div
        style={{
          width: '100%',
          opacity,
          transform: `scale(${scale * (0.94 + enter * 0.06)})`,
          display: 'flex',
          flexDirection: 'column',
          gap: 30
        }}
      >
        <div
          style={{
            width: 110,
            height: 10,
            borderRadius: 10,
            background: scene.color
          }}
        />

        <h1
          style={{
            fontSize: 88,
            lineHeight: 1.08,
            margin: 0,
            fontWeight: 900
          }}
        >
          {scene.title}
        </h1>

        <p
          style={{
            fontSize: 48,
            lineHeight: 1.3,
            margin: 0,
            opacity: 0.85
          }}
        >
          {scene.subtitle}
        </p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 80,
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