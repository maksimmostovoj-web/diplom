# 🎓 Дипломный проект: Автоматизация тестирования UI + API

## 🚀 JavaScript + Playwright

---

<div align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Allure-1E90FF?style=for-the-badge&logo=allure&logoColor=white"/>
</div>

---

## 📖 Оглавление

- [📝 Описание проекта](#-описание-проекта)
- [🛠️ Технологии](#️-технологии)
- [🧪 Тестируемые приложения](#-тестируемые-приложения)
- [💻 Локальный запуск](#-локальный-запуск)
- [🏗️ Jenkins](#️-jenkins)
- [⚡ GitHub Actions](#-github-actions)
- [🧪 Allure TestOps](#-allure-testops)
- [📨 Telegram уведомления](#-telegram-уведомления)
- [📁 Структура проекта](#-структура-проекта)
- [⌨️ Команды](#️-команды)

---

## 📝 Описание проекта

Репозиторий содержит автоматизированные тесты для **UI** и **API**, интегрированные с современными инструментами CI/CD, отчётности и уведомлений.

### 🧪 Что тестируем:

| Тип тестов | Приложение                                                           | Описание                                                      |
| ---------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| 🖥️ **UI**  | [RealWorld](https://realworld.qa.guru/)                              | Современное веб-приложение для отработки навыков тестирования |
| 🔌 **API** | [Apichallenges](https://apichallenges.eviltester.com/gui/challenges) | Сервис для проверки корректности API-запросов                 |

### 🔁 Куда интегрировано:

- 🏗️ **Jenkins** — ручной запуск через интерфейс
- ⚡ **GitHub Actions** — автоматический запуск на push / pull request
- 📊 **Allure Report** — наглядные отчёты с графиками
- 🧪 **Allure TestOps** — хранение истории прогонов и управление кейсами
- 📨 **Telegram** — уведомления о статусе прогонов

---

## 🛠️ Технологии

| Технология                                                                                                                   | Назначение                          |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)              | Язык программирования               |
| ![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)              | Фреймворк для UI + API тестирования |
| ![Faker.js](https://img.shields.io/badge/Faker.js-FF6B6B?style=flat-square&logo=faker&logoColor=white)                       | Генерация тестовых данных           |
| ![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white)                       | CI/CD (ручной запуск)               |
| ![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) | CI/CD (автоматический запуск)       |
| ![Allure](https://img.shields.io/badge/Allure-1E90FF?style=flat-square&logo=allure&logoColor=white)                          | Отчёты и TestOps                    |
| ![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)                    | Уведомления о прогонах              |

---

## 🧪 Тестируемые приложения

### 🖥️ UI (RealWorld)

| Сценарий        | Эмодзи | Описание                           |
| --------------- | ------ | ---------------------------------- |
| Авторизация     | 🔐     | Вход в систему по логину и паролю  |
| Создание статьи | ✍️     | Публикация новой статьи            |
| Редактирование  | 📝     | Изменение существующей статьи      |
| Удаление        | 🗑️     | Удаление своей статьи              |
| Комментарии     | 💬     | Добавление комментариев к статье   |
| Профиль         | 👤     | Редактирование данных пользователя |

### 🔌 API (Apichallenges)

| Метод  | Эндпоинт      | Описание                    |
| ------ | ------------- | --------------------------- |
| GET    | `/todos`      | Получение списка задач      |
| GET    | `/todos/{id}` | Получение задачи по ID      |
| POST   | `/todos`      | Создание новой задачи       |
| PUT    | `/todos/{id}` | Обновление задачи           |
| DELETE | `/todos/{id}` | Удаление задачи             |
| HEAD   | `/todos`      | Получение только заголовков |
| ⚠️     | Ошибки        | Проверка статусов 400, 404  |

---

## 💻 Локальный запуск

### 1️⃣ Клонируйте репозиторий

```bash
git clone https://github.com/maksimmostovoj-web/diplom.git
```

### 2️⃣ Установите зависимости

```bash
npm ci
```

```bash
npx playwright install
```

### 3️⃣ Запустите тесты

**Все тесты**

```bash
npm test
```

**UI-режим Playwright**

```bash
npm run ui
```

**Открыть встроенный отчёт Playwright**

```bash
npm run report
```

### 4️⃣ Allure-отчёт

**Сгенерировать отчёт**

```bash
npm run allure:generate
```

**Открыть отчёт в браузере**

```bash
npm run allure:serve
```

### 5️⃣ Быстрый запуск + уведомление 🚀

```bash
./run-tests.sh
```

> 💡 **Скрипт автоматически:**  
> ✅ запустит тесты  
> ✅ сгенерирует отчёт  
> ✅ отправит уведомление в Telegram

---

## 🏗️ Jenkins

### 🚀 Запуск

1. Авторизуйтесь в Jenkins
2. Найдите джобу: `001-maksimyyh-js_diplom`
3. Нажмите **Build Now**

### ⚙️ Что происходит внутри

| Этап                                  | Статус |
| ------------------------------------- | ------ |
| Клонирование репозитория              | ✅     |
| Установка зависимостей                | ✅     |
| Запуск тестов                         | ✅     |
| Генерация Allure-отчёта               | ✅     |
| Отправка результатов в Allure TestOps | ✅     |
| Уведомление в Telegram                | ✅     |

> 📎 **Результаты:** Allure-отчёт доступен по ссылке внутри джобы.

---

## ⚡ GitHub Actions

### 🔁 Триггеры запуска

| Тип запуска           | Условие                                    |
| --------------------- | ------------------------------------------ |
| 🔄 **Автоматический** | Push в ветку `main`                        |
| 👆 **Ручной**         | Ручной запуск workflow (workflow_dispatch) |

### ⚙️ Что происходит внутри

| Этап                                  | Статус |
| ------------------------------------- | ------ |
| Установка Node.js                     | ✅     |
| Установка зависимостей                | ✅     |
| Запуск тестов                         | ✅     |
| Генерация Allure-отчёта               | ✅     |
| Отправка результатов в Allure TestOps | ✅     |
| Уведомление в Telegram                | ✅     |

> 🔍 **Где смотреть:** вкладка **Actions** на GitHub

---

## 🧪 Allure TestOps

🔗 **Ссылка на проект:**  
[https://allure.autotests.cloud/project/...](https://allure.autotests.cloud/project/...)

### 📊 В TestOps хранится:

- 📈 графики трендов
- 📊 метрики качества
- 🏷️ управление тест-кейсами
- 👥 совместная работа над отчётами

## 📨 Telegram уведомления

После каждого прогона (Jenkins или GitHub Actions) бот отправляет сообщение:

````html
<b>Результаты:</b>

<b>Рабочее окружение:</b> test

<b>Комментарий:</b> Дипломный проект JS

<b>Продолжительность:</b> 00:03:35

<b>Всего сценариев:</b> 15

<b>Успешных:</b> 15 (100%)

<b>Упавших:</b> 0 (0%)

<b>Пропущенных:</b> 0

<b>Отчет доступен по ссылке:</b> https://jenkins.autotests.cloud/... ## ⌨️
Команды проекта ### Запуск тестов **Запуск всех тестов** ```bash npm test
````

**Запуск API тестов (файл api.spec.js)**

```bash
npx playwright test api.spec.js
```

**Запуск UI тестов (файл ui.spec.js)**

```bash
npx playwright test ui.spec.js
```

### Работа с отчётами

**Открыть встроенный отчёт Playwright**

```bash
npm run report
```

**Сгенерировать Allure-отчёт**

```bash
npx allure generate
```

**Открыть Allure-отчёт в браузере**

```bash
npx allure open
```

### Интеграция и CI/CD

**Отправить отчёт в Allure TestOps**

```bash
npm run allure:send
```

**Полный цикл: тесты → отчёт → уведомление**

```bash
./run-tests.sh
```

---

## 📝 Примечания

- Для генерации тестовых данных используется **Faker.js**
- Отчёты формируются в **Allure** и доступны через Jenkins/GitHub Actions
- Уведомления отправляются в **Telegram** после каждого прогона
