import { Composition } from 'remotion';
import { Reel, type ReelProps } from './Reel';

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
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={750}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={defaultProps}
    />
  );
};