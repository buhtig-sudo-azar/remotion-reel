import { Composition } from 'remotion';
import { z } from 'zod';
import { Reel, type ReelProps } from './Reel';
import { Cover } from './Cover';

export const reelSchema = z.object({
  durationInSeconds: z.number().min(5).max(60),
  transitionFrames: z.number().min(0).max(60),
  scenes: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      color: z.string()
    })
  )
});

const defaultProps: ReelProps = {
  durationInSeconds: 15,
  transitionFrames: 12,
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
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};