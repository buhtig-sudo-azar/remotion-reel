import { Composition } from 'remotion';
import { z } from 'zod';
import { Reel } from './Reel';
import { Cover } from './Cover';
import audioFiles from './audio-files.json';

const fallbackAudio = audioFiles[0] ?? '';

export const reelSchema = z.object({
  durationInSeconds: z.number().min(5).max(60),
  transitionFrames: z.number().min(0).max(60),
  audioFile: audioFiles.length
    ? z.enum(audioFiles as [string, ...string[]])
    : z.string().min(1),
  scenes: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      color: z.string()
    })
  )
});

export type ReelProps = z.infer<typeof reelSchema>;

const defaultProps: ReelProps = {
  durationInSeconds: 15,
  transitionFrames: 12,
  audioFile: fallbackAudio,
  scenes: [
    {
      title: 'Сделаем страницу-урок на чистом JS',
      subtitle: 'Без React, сборки и зависимостей',
      color: '#2563eb'
    },
    {
      title: 'Один HTML-файл',
      subtitle: 'Плюс CSS и JavaScript',
      color: '#2563eb'
    },
    {
      title: 'Уроки переключаются без перезагрузки',
      subtitle: 'Прогресс сохраняется в браузере',
      color: '#16a34a'
    },
    {
      title: 'Хочешь повторить?',
      subtitle: 'Пошаговый гайд — по ссылке',
      color: '#f59e0b'
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
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
        calculateMetadata={({ props }) => ({
          durationInFrames: Math.round(props.durationInSeconds * 30)
        })}
      />

      <Composition
        id="Cover"
        component={Cover}
        schema={reelSchema}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
        calculateMetadata={() => ({
          durationInFrames: 1
        })}
      />
    </>
  );
};