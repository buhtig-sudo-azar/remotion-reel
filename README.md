# Remotion Reel — генератор вертикальных видео

Проект создаёт короткие вертикальные видео (1080×1920) программно с помощью [Remotion](https://www.remotion.dev/). Вместо генерации видео нейросетью здесь описывается анимация кодом на React/TypeScript, а Remotion рендерит готовый MP4.

Текущий ролик — образовательный Reels о типичных причинах уязвимостей при загрузке файлов и базовых мерах защиты.

## Возможности

- Вертикальный формат: 1080×1920, 30 fps.
- Пять сцен с заголовком, пояснением и цветовым акцентом.
- Плавное появление текста через `spring()`.
- Прогресс-бар внизу экрана.
- Рендер в MP4 через Remotion CLI.
- Запуск в GitHub Codespaces без локальной установки.

## Структура проекта

```text
remotion-reel/
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── README.md
└── src/
    ├── index.ts      # Точка входа Remotion
    ├── Root.tsx      # Регистрация композиции и параметров видео
    └── Reel.tsx      # Содержимое и анимация ролика
```

## Требования

- Node.js 18 или новее.
- npm.
- Для рендера в Linux/GitHub Codespaces нужны системные библиотеки Chromium.

## Быстрый старт

### 1. Установи зависимости

```bash
npm install
```

### 2. Запусти Remotion Studio

```bash
npm start
```

Studio будет доступна по адресу:

```text
http://localhost:3000
```

В GitHub Codespaces открой вкладку **Ports**, найди порт `3000` и нажми **Open in Browser**.

### 3. Собери видео

```bash
npx remotion render src/index.ts Reel out/file-upload-security.mp4
```

Готовый файл появится здесь:

```text
out/file-upload-security.mp4
```

## Настройка ролика

Открой `src/Reel.tsx` и измените массив `scenes`:

```tsx
const scenes = [
  {
    title: 'Заголовок сцены',
    subtitle: 'Короткое пояснение',
    color: '#2563eb'
  }
];
```

- `title` — крупный текст сцены.
- `subtitle` — пояснение под заголовком.
- `color` — цвет акцентной полосы.

Чтобы изменить длительность, открой `src/Root.tsx`:

```tsx
<Composition
  id="Reel"
  component={Reel}
  durationInFrames={750}
  fps={30}
  width={1080}
  height={1920}
/>
```

Формула длительности:

```text
длительность в секундах × fps = durationInFrames
```

Например, 25 секунд при 30 fps:

```text
25 × 30 = 750 кадров
```

## Запуск в GitHub Codespaces

1. Открой репозиторий на GitHub.
2. Нажми **Code → Codespaces → Create codespace on main**.
3. В терминале Codespace выполни:

```bash
npm install
npm start
```

4. Открой порт `3000` через панель **Ports**.
5. Для создания MP4 выполни:

```bash
npx remotion render src/index.ts Reel out/file-upload-security.mp4
```

6. Скачай файл из папки `out` через проводник VS Code.

## Установка зависимостей Chromium в Codespaces

Если при рендере возникает ошибка вида:

```text
error while loading shared libraries: libatk-1.0.so.0
```

выполни:

```bash
sudo apt-get update
sudo apt-get install -y \
  libatk1.0-0t64 \
  libatk-bridge2.0-0t64 \
  libcups2t64 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libasound2t64 \
  libpango-1.0-0 \
  libcairo2 \
  libnss3 \
  libnspr4 \
  libx11-xcb1
```

Затем повтори рендер.

## Правила пользования

1. **Используй проект только для законного образовательного контента.**  
   Не создавай материалы, которые обучают атакам, обходу защит или наносят вред системам и людям.

2. **Не публикуй секреты в репозитории.**  
   API-ключи, токены, пароли и файлы `.env` не должны попадать в Git. Добавь `.env` в `.gitignore`.

3. **Не коммить папки сборки и зависимости.**  
   В `.gitignore` должны быть:

   ```gitignore
   node_modules/
   out/
   .remotion/
   ```

4. **Проверяй текст перед публикацией.**  
   Контент должен быть точным, этичным и не вводить зрителей в заблуждение.

5. **Соблюдай лицензии Remotion.**  
   Remotion бесплатен для личного использования и компаний до трёх человек; для коммерческого использования, автоматизации и массового рендера могут требоваться платные лицензии. Проверь актуальные условия на сайте Remotion.

6. **Останавливай Codespace после работы.**  
   Это помогает экономить квоту GitHub Codespaces: меню **Codespaces → Stop**.

7. **Делай изменения через отдельные ветки.**  
   Для правок создавай ветку, проверяй ролик в Studio и только затем объединяй изменения с `main`.

## Полезные команды

```bash
# Установить зависимости
npm install

# Запустить студию
npm start

# Собрать видео
npx remotion render src/index.ts Reel out/file-upload-security.mp4

# Посмотреть доступные композиции
npx remotion compositions src/index.ts

# Проверить версии Remotion
npx remotion versions
```

## Лицензия

Код проекта можно распространять по лицензии MIT, если ты являешься его автором или имеешь право это делать. Условия использования самого Remotion определяются отдельно его собственной лицензией.