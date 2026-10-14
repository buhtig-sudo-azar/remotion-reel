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
