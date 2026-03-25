// Подключаем модули для работы с файловой системой
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join, resolve } from 'path'
// Импортируем функцию создания диаграммы из соседнего файла
import { buildChartUrl } from './chart.mjs'

// Определяем корневую папку проекта (на уровень выше)
const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// Путь к файлу отчета. Можно передать аргументом, иначе берет стандартный путь
const REPORT_PATH = resolve(
  ROOT,
  process.argv[2] || 'allure-report/widgets/summary.json'
)

// Загружает JSON-отчет из файла
function loadReport(path) {
  // Проверяем, существует ли файл
  if (!existsSync(path)) throw new Error(`Report file not found: ${path}`)
  // Читаем и парсим JSON
  return JSON.parse(readFileSync(path, 'utf8'))
}

// Получает настройки Telegram из переменных окружения
function getConfig() {
  const token = process.env.TELEGRAM_TOKEN // Токен бота
  const chat = process.env.TELEGRAM_CHAT // ID чата или пользователя
  if (!token || !chat)
    throw new Error(
      'Set TELEGRAM_TOKEN and TELEGRAM_CHAT environment variables.'
    )
  return { token, chat }
}

// Извлекает статистику из отчета (количество тестов по статусам)
function getStats(report) {
  // Статистика может быть в поле statistic или stats
  const stats = report.statistic ?? report.stats ?? {}

  const total = stats.total ?? 0 // всего тестов
  const failed = stats.failed ?? 0 // провалено
  const broken = stats.broken ?? 0 // сломано
  const skipped = stats.skipped ?? 0 // пропущено
  const unknown = stats.unknown ?? 0 // неизвестно

  // Успешные = общее количество минус все остальные
  const passed =
    stats.passed ?? Math.max(0, total - failed - broken - skipped - unknown)

  return { total, passed, failed, broken, skipped, unknown }
}

// Форматирует время из миллисекунд в формат ЧЧ:ММ:СС.мс
function formatDuration(ms) {
  // Если время не указано или отрицательное - возвращаем нули
  if (ms == null || ms < 0) return '00:00:00.000'

  const totalSec = ms / 1000 // переводим в секунды
  const h = Math.floor(totalSec / 3600) // часы
  const m = Math.floor((totalSec % 3600) / 60) // минуты
  const s = totalSec % 60 // секунды
  const secInt = Math.floor(s) // целые секунды
  const millis = Math.round((s - secInt) * 1000) // миллисекунды

  // Форматируем с ведущими нулями
  const secPart = `${String(secInt).padStart(2, '0')}.${String(millis).padStart(3, '0')}`
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${secPart}`
}

// Формирует текст сообщения для отправки в Telegram
function buildMessage(report, stats) {
  // Выводим отладочную информацию
  console.log('=== DEBUG ===')
  console.log('REPORT_LINK from env:', process.env.REPORT_LINK)
  console.log('PROJECT_NAME:', process.env.PROJECT_NAME)
  console.log('TELEGRAM_TOKEN:', process.env.TELEGRAM_TOKEN ? 'SET' : 'NOT SET')
  console.log('============')

  const { name, reportName } = report
  const { total, passed, failed, broken, skipped, unknown } = stats
  const duration = report.time?.duration || report.duration || 0

  // Берем настройки из переменных окружения или из отчета
  const project =
    process.env.PROJECT_NAME ?? name ?? reportName ?? 'Test Report'
  const environment = process.env.TEST_ENV ?? 'staging' // окружение
  const comment = process.env.TEST_COMMENT ?? '' // комментарий
  const reportLink = process.env.REPORT_LINK ?? '' // ссылка на отчет

  // Функция для расчета процентов (один знак после запятой)
  const pct = (n) => (total > 0 ? ((n / total) * 100).toFixed(1) : '0')

  // Собираем строки сообщения
  const lines = [
    `📊 *${project}*`, // название проекта жирным
    '',
    `🖥️ *Окружение:* ${environment}`, // окружение
    comment ? `💬 *Комментарий:* ${comment}` : '', // комментарий (если есть)
    `⏱️ *Длительность:* ${formatDuration(duration)}`, // время выполнения
    '',
    `📈 *Статистика:*`,
    `   ✅ *Успешно:* ${passed} (${pct(passed)} %)`,
    `   ❌ *Провалено:* ${failed} (${pct(failed)} %)`,
    `   ⏭️ *Пропущено:* ${skipped}`
  ].filter(Boolean) // убираем пустые строки

  // Добавляем дополнительные статусы, если они есть (не нулевые)
  if (broken > 0) lines.push(`   💔 *Сломано:* ${broken}`)
  if (unknown > 0) lines.push(`   ❓ *Неизвестно:* ${unknown}`)

  lines.push('')
  lines.push(`📊 *Всего тестов:* ${total}`)

  // Добавляем ссылку на полный отчет, если она указана
  if (reportLink) {
    lines.push('')
    lines.push(`🔗 [📄 Открыть отчет](${reportLink})`)
  }

  return lines.join('\n') // объединяем строки с переносами
}

// Отправляет сообщение с картинкой в Telegram
async function sendToTelegram(token, chatId, imageUrl, text) {
  const url = `https://api.telegram.org/bot${token}/sendPhoto`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId, // куда отправляем
      photo: imageUrl, // ссылка на картинку (диаграмму)
      caption: text, // текст под картинкой
      parse_mode: 'Markdown', // разрешаем форматирование текста
      disable_web_page_preview: true // не показываем превью ссылок
    })
  })

  // Проверяем, успешно ли отправилось
  if (!res.ok) throw new Error(`Telegram API error ${res.status}`)
  const data = await res.json()
  if (!data.ok) throw new Error(`Telegram error: ${data.description}`)
  return data
}

// нчинается выполнение
async function main() {
  // 1. Загружаем отчет из файла
  const report = loadReport(REPORT_PATH)

  // 2. Получаем настройки Telegram
  const { token, chat } = getConfig()

  // 3. Извлекаем статистику из отчета
  const stats = getStats(report)

  // 4. Создаем ссылку на диаграмму с результатами
  const chartUrl = buildChartUrl(stats)

  // 5. Формируем текст сообщения
  const message = buildMessage(report, stats)

  // 6. Отправляем уведомление
  console.log('Sending notification to Telegram...')
  await sendToTelegram(token, chat, chartUrl, message)
  console.log('Notification sent successfully!')
}

// Запускаем программу и ловим возможные ошибки
main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
