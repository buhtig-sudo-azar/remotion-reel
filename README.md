# Remotion Reel Generator

Универсальный генератор вертикальных Reels и обложек на [Remotion](https://www.remotion.dev/). Проект превращает JSON-сценарий в готовое видео 1080×1920 и отдельную PNG-обложку.

Ты меняешь только тексты, цвета и количество сцен — шаблон, анимация и рендер остаются прежними. Это удобно для образовательных роликов, карточек, объяснений, анонсов и серий однотипных видео.

## Как это работает

```text
content.json  →  тема, заголовки, пояснения, цвета
      ↓
Reel.tsx      →  шаблон видео и анимация
      ↓
Cover.tsx     →  шаблон обложки
      ↓
Remotion      →  MP4 или PNG
      ↓
out/          →  готовые файлы
```

- **`content.json`** — контент конкретного ролика.
- **`src/Reel.tsx`** — универсальный шаблон видео.
- **`src/Cover.tsx`** — универсальный шаблон обложки.
- **`src/Root.tsx`** — параметры композиций и Zod-схема.
- **Remotion Studio** — интерфейс для предпросмотра и редактирования props.

## Структура проекта

```text
remotion-reel/
├── .gitignore
├── package.json
├── tsconfig.json
├── remotion.config.ts
├── README.md
├── content.json
└── src/
    ├── index.ts       # Точка входа Remotion
    ├── Root.tsx       # Композиции Reel и Cover, Zod-схема
    ├── Reel.tsx       # Шаблон видео
    └── Cover.tsx      # Шаблон обложки
```

## Возможности

- Вертикальный формат: 1080×1920, 30 fps.
- Видео длительностью 25 секунд по умолчанию.
- Любое количество сцен.
- Заголовок, пояснение и цветовой акцент для каждой сцены.
- Плавное появление текста через `spring()`.
- Прогресс-бар внизу видео.
- Отдельная обложка `Cover` в формате PNG.
- Редактирование контента в Remotion Studio.
- Генерация разных видео из одного шаблона через `--props`.
- Запуск в GitHub Codespaces без локальной установки.

## Быстрый старт

### 1. Установи зависимости

```bash
npm install
```

### 2. Запусти Remotion Studio

```bash
npm start
```

Studio откроется по адресу:

```text
http://localhost:3000
```

В GitHub Codespaces открой вкладку **Ports**, найди порт `3000` и нажми **Open in Browser**.

### 3. Собери видео

```bash
npx remotion render src/index.ts Reel out/my-reel.mp4 --props=content.json
```

### 4. Собери обложку

```bash
npx remotion still src/index.ts Cover out/cover.png --props=content.json
```

Готовые файлы появятся в папке `out/`.

## Формат контента

Открой `content.json`:

```json
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
```

### Поля сцены

| Поле | Назначение | Рекомендация |
|---|---|---|
| `title` | Крупный заголовок экрана | 2–5 слов |
| `subtitle` | Пояснение под заголовком | 1–2 коротких предложения |
| `color` | Цвет акцентной полосы | HEX-код, например `#2563eb` |

Каждый объект в массиве `scenes` — один экран видео. Обложка использует первую сцену.

## Как изменить контент в Studio

1. Запусти Studio:

   ```bash
   npm start
   ```

2. Открой порт `3000` через вкладку **Ports**.
3. Слева выбери **Reel** или **Cover**.
4. Справа открой вкладку **Props**.
5. Раскрой `scenes`.
6. Изменяй `title`, `subtitle` и `color`.
7. Добавляй или удаляй сцены кнопками редактора массива.
8. Нажми **Play** — изменения сразу появятся в предпросмотре.

## Как создать видео на новую тему

### Вариант 1: новый JSON-файл

Создай, например, `ai-productivity.json`:

```json
{
  "scenes": [
    {
      "title": "ИИ экономит время",
      "subtitle": "Автоматизируй рутину и сосредоточься на главном",
      "color": "#2563eb"
    },
    {
      "title": "Делегируй черновики",
      "subtitle": "Проси ИИ подготовить первый вариант текста",
      "color": "#7c3aed"
    },
    {
      "title": "Проверяй результат",
      "subtitle": "Финальное решение всегда за тобой",
      "color": "#16a34a"
    }
  ]
}
```

Собери отдельный ролик:

```bash
npx remotion render src/index.ts Reel out/ai-productivity.mp4 --props=ai-productivity.json
```

И обложку:

```bash
npx remotion still src/index.ts Cover out/ai-cover.png --props=ai-productivity.json
```

### Вариант 2: промпт для ИИ-агента

```text
Создай JSON для Remotion-видео на тему: [ТЕМА].

Формат:
{
  "scenes": [
    {
      "title": "Заголовок",
      "subtitle": "Пояснение",
      "color": "#2563eb"
    }
  ]
}

Правила:
- 5 сцен.
- title: максимум 5 слов.
- subtitle: 1–2 коротких предложения.
- color: разные HEX-цвета.
- Тон: образовательный, понятный, без кликбейта.
- Верни только валидный JSON.
```

Пример:

```text
Создай JSON для Remotion-видео на тему:
«Как защитить аккаунт от фишинга».
```

Сохрани ответ в `phishing.json` и собери:

```bash
npx remotion render src/index.ts Reel out/phishing.mp4 --props=phishing.json
npx remotion still src/index.ts Cover out/phishing-cover.png --props=phishing.json
```

## Настройка длительности

Открой `src/Root.tsx` и измени `durationInFrames`:

```tsx
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
```

Формула:

```text
длительность в секундах × fps = durationInFrames
```

| Длительность | `durationInFrames` при 30 fps |
|---:|---:|
| 15 секунд | 450 |
| 20 секунд | 600 |
| 25 секунд | 750 |
| 30 секунд | 900 |

Все сцены автоматически получают равную часть общей длительности.

## Команды

```bash
# Установить зависимости
npm install

# Запустить студию
npm start

# Собрать видео из content.json
npx remotion render src/index.ts Reel out/my-reel.mp4 --props=content.json

# Собрать обложку из content.json
npx remotion still src/index.ts Cover out/cover.png --props=content.json

# Собрать видео из другого сценария
npx remotion render src/index.ts Reel out/other.mp4 --props=other.json

# Посмотреть доступные композиции
npx remotion compositions src/index.ts

# Проверить версии Remotion
npx remotion versions
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
5. Для рендера выполни:

```bash
npx remotion render src/index.ts Reel out/my-reel.mp4 --props=content.json
npx remotion still src/index.ts Cover out/cover.png --props=content.json
```

6. Скачай файлы из папки `out` через проводник VS Code.

## Установка зависимостей Chromium в Codespaces

Если при рендере возникает ошибка:

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

1. **Создавай только законный и этичный контент.**  
   Не используй проект для дезинформации, мошенничества, дискриминации, вредоносных инструкций или нарушения чужих прав.

2. **Проверяй факты перед публикацией.**  
   ИИ может ошибаться. Ответственность за точность и последствия публикации остаётся за автором.

3. **Не публикуй секреты в репозитории.**  
   Не коммить API-ключи, токены, пароли и файлы `.env`.

4. **Не коммить временные файлы.**  
   В `.gitignore` должны быть:

   ```gitignore
   node_modules/
   out/
   .remotion/
   .env
   *.log
   ```

5. **Соблюдай лицензию Remotion.**  
   Remotion может быть бесплатным для личного использования и небольших команд, но для коммерческого использования, автоматизации и массового рендера могут требоваться платные лицензии. Проверь актуальные условия на сайте Remotion.

6. **Останавливай Codespace после работы.**  
   Это помогает экономить квоту GitHub Codespaces: меню **Codespaces → Stop**.

7. **Храни сценарии отдельно от шаблона.**  
   Для новой темы создавай новый JSON, а не изменяй код анимации.

8. **Делай изменения через ветки.**  
   Для правок шаблона создавай ветку, проверяй результат в Studio и только затем объединяй с `main`.

## Рекомендации по хорошим Reels

- Одна сцена — одна мысль.
- Текст должен читаться за 3–5 секунд.
- Начинай с проблемы, вопроса или обещания пользы.
- Заканчивай практическим выводом.
- Для сложной темы делай серию коротких роликов.
- Используй единые цвета и ритм появления текста.

## Лицензия

Исходный код проекта можно распространять по лицензии MIT, если ты являешься его автором или имеешь соответствующие права. Условия использования Remotion определяются отдельной лицензией Remotion.
