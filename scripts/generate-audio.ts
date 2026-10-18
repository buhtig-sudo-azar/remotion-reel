import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
const outputFile = path.join(process.cwd(), 'src', 'audio-files.json');

const audioExtensions = ['.mp3', '.wav', '.m4a', '.ogg'];

const getAudioFiles = (): string[] => {
  if (!fs.existsSync(publicDir)) {
    return [];
  }

  return fs
    .readdirSync(publicDir)
    .filter((file) => {
      return audioExtensions.includes(path.extname(file).toLowerCase());
    })
    .sort();
};

const writeAudioFiles = () => {
  const audioFiles = getAudioFiles();

  fs.writeFileSync(
    outputFile,
    JSON.stringify(audioFiles, null, 2),
    'utf-8'
  );

  console.log(`Аудиофайлов: ${audioFiles.length}`);
  console.log(`Список сохранён: ${outputFile}`);
};

writeAudioFiles();

if (process.argv.includes('--watch')) {
  console.log('Слежу за папкой public...');

  fs.watch(publicDir, { persistent: true }, () => {
    writeAudioFiles();
  });
}