import gradient from 'gradient-string'

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'

function getTime() {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  const millisec = now.getMilliseconds().toString().padStart(3, '0') // 获取毫秒并格式化为三位
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
    now.getHours()
  )}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${millisec}` // 格式化时间戳包括毫秒
}

// 渐变背景色（浏览器用 linear-gradient，Node 用多色 ANSI 背景模拟）
const browserStyles: Record<string, string> = {
  log: 'background: linear-gradient(90deg, #4ade80, #22c55e); color: #222; padding:2px 8px; border-radius:3px;',
  info: 'background: linear-gradient(90deg, #3b82f6, #2563eb); color: #fff; padding:2px 8px; border-radius:3px;',
  warn: 'background: linear-gradient(90deg, #fde047, #facc15); color: #fff; padding:2px 8px; border-radius:3px;',
  error:
    'background: linear-gradient(90deg, #ef4444, #dc2626); color: #fff; padding:2px 8px; border-radius:3px;',
}

// 表情
const emojis = {
  log: '🥳',
  info: '🔔',
  warn: '🫵',
  error: '😭',
}

type ConsoleMethod = 'log' | 'info' | 'warn' | 'error'

// 3D 立体文字效果的样式
const threeDEffects = `
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2),
               0 0 25px rgba(0, 0, 0, 0.4),
               0 0 5px rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
`

function patchConsole() {
  ;(['log', 'info', 'warn', 'error'] as ConsoleMethod[]).forEach((method) => {
    const original = console[method].bind(console)
    if (isBrowser) {
      console[method] = (...args: any[]) => {
        // 时间戳背景色用 browserStyles[method]，文本色强制 #fff，添加3D效果
        const style = browserStyles[method].replace(/color:[^;]+;/, 'color: #fff;') + threeDEffects
        original(`%c${getTime()} ${emojis[method]}：`, style, ...args)
      }
    } else {
      // Node环境下的实现 - 使用渐变色时间戳
      // 为不同日志级别定义渐变色（匹配浏览器端颜色）
      const logGradient = gradient([
        { color: '#A770EF', pos: 0 },
        { color: '#CF8BF3', pos: 0.1 },
        { color: '#22c55e', pos: 1 },
      ])
      const infoGradient = gradient([
        { color: '#A770EF', pos: 0 },
        { color: '#CF8BF3', pos: 0.1 },
        { color: '#2563eb', pos: 1 },
      ])
      const warnGradient = gradient([
        { color: '#A770EF', pos: 0 },
        { color: '#CF8BF3', pos: 0.1 },
        { color: '#facc15', pos: 1 },
      ])
      const errorGradient = gradient([
        { color: '#A770EF', pos: 0 },
        { color: '#CF8BF3', pos: 0.1 },
        { color: '#dc2626', pos: 1 },
      ])

      // 根据日志级别获取对应的渐变色
      const getLevelGradient = (level: string) => {
        switch (level) {
          case 'log':
            return logGradient
          case 'info':
            return infoGradient
          case 'warn':
            return warnGradient
          case 'error':
            return errorGradient
          default:
            return logGradient
        }
      }
      console[method] = (...args: any[]) => {
        const timestamp = `[${getTime()}]`
        const gradient = getLevelGradient(method)
        original(gradient(timestamp) + ` ${emojis[method]}：`, ...args)
      }
    }
  })
}

patchConsole()

console.log('Console patched with enhanced styles and emojis!')


export { patchConsole }
