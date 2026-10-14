import {Composition} from 'remotion';
import {Reel} from './Reel';

export const RemotionRoot = () => (
  <Composition
    id="Reel"
    component={Reel}
    durationInFrames={180}
    fps={30}
    width={1080}
    height={1920}
  />
);
