# Kinoarea.

# Описания.

# Начало работы.

## Проверка наличия Node.js.

```bash
node --version
```

```bash
npm --version
```

```bash
npx --version
```

Если Node.js не установлен, то вот [Инструкция](https://gitlab.com/vladimir_kondaurov/settings/-/blob/main/backend/nodejs/nodejs.txt) по установке на Linux (Debian).

## Установка зависимостей.

```bash
npm install
```

Проверка установленных зависимостей.

```bash
npm list
```

# Технологий.

- HTML
- CSS
- Sass
- JS

# Таск-менеджер.

- Gulp 4

# Cредство для форматирования кода.

- EditorConfig
- Prettier

# Линтеры.

- Stylelint
- Eslint

# Структура каталогов и файлов.

```
├── source/                          # Исходники
│   ├── favicon                      # Favicon
│   ├── fonts                        # Шрифты
│   ├── images                       # Изображения
│   ├── scripts                      # Скрипты
│   ├── scss                         # Стили
│   │   ├── blocks                   # Стили блоков
│   │   └── global                   # Стили глобальные
│   └── index.html                   # Главная страница
├── .editorconfig                    # EditorConfig настройки форматирования файлов.
├── .eslintignore                    # Eslint настройки игнорирования файлов и каталогов.
├── .eslintrc                        # Eslint настройки форматирования кода.
├── .gitignore                       # Git настройки игнорирования файлов и каталогов.
├── .prettierignore                  # Prettier настройки игнорирования файлов и каталогов.
├── .prettierrc                      # Prettier настройки форматирования кода.
├── .stylelintignore                 # Stylelint настройки игнорирования файлов и каталогов.
├── .stylelintrc                     # Stylelint настройки форматирования кода.
├── gulpfile                         # Gulp настройки сборки.
├── package-lock                     # Фиксация зависимостей к определенному номеру версии.
└── package                          # Файл управления версиями.
```
