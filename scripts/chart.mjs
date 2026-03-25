// Цвета для разных статусов тестов (используются в диаграмме)
const COLORS = {
  passed: '#22c55e',
  failed: '#ef4444',
  broken: '#eab308',
  skipped: '#94a3b8',
  unknown: '#a855f7'
}

// Функция создает ссылку на диаграмму-пончик с результатами тестов
export function buildChartUrl(stats) {
  // Достаем данные о количестве тестов
  const { total, passed, failed, broken, skipped, unknown } = stats

  // Массив с количеством тестов в том же порядке, что и названия
  const counts = [passed, failed, broken, skipped, unknown]

  // Названия статусов для подписей
  const names = ['passed', 'failed', 'broken', 'skipped', 'unknown']

  // Берем цвета для каждого статуса
  const colors = names.map((k) => COLORS[k])

  // Функция для расчета процентов (если тестов нет - 0%)
  const pct = (n) => (total > 0 ? Math.round((n / total) * 100) : 0)

  // Переводим количество тестов в проценты для диаграммы
  const data = counts.map(pct)

  // Создаем подписи для легенды: "5 passed", "3 failed" и т.д.
  const legendLabels = names.map((name, i) => `${counts[i]} ${name}`)

  // Настройки диаграммы для сервиса quickchart.io
  const chartConfig = {
    type: 'doughnut', //  пончик
    data: {
      labels: legendLabels,
      datasets: [
        {
          data, // проценты для каждой секции
          backgroundColor: colors, // цвета секций
          borderWidth: 0 // без обводки
        }
      ]
    },
    options: {
      cutout: '65%', // размер внутренней отверстия (65% от радиуса)
      layout: { padding: 12 }, // отступы вокруг диаграммы
      plugins: {
        legend: {
          display: true, // показывать легенду
          position: 'right', // легенда справа от диаграммы
          labels: {
            usePointStyle: true, // использовать точки вместо квадратов
            padding: 10, // отступ между элементами легенды
            font: { size: 12 } // размер шрифта
          }
        },
        doughnutlabel: {
          labels: [
            // Центральная надпись - общее количество тестов
            { text: String(total), font: { size: 24 }, color: '#1e293b' },
            // Подпись под числом
            { text: 'Total scenarios', font: { size: 11 }, color: '#64748b' }
          ]
        },
        datalabels: {
          display: true, // показывать проценты на секциях
          color: '#1e293b',
          font: { size: 11, weight: 'bold' }
        },
        tickFormat: {
          suffix: '%', // добавляем знак % к числам
          applyToDataLabels: true
        }
      }
    }
  }

  // Кодируем настройки в JSON и создаем ссылку для генерации картинки
  const encoded = encodeURIComponent(JSON.stringify(chartConfig))
  return `https://quickchart.io/chart?c=${encoded}&width=320&height=320`
}
