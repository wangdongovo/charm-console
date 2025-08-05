# charm-console

> 自动重写 console 方法，支持渐变高亮和时间戳，兼容浏览器和 Node.js，ESM 支持。

## 功能特性

- 自动为 `console.log`、`console.info`、`console.warn`、`console.error` 添加渐变背景色高亮
- 日志前自动插入时间戳（格式：YYYY-MM-DD HH:mm:ss）
- 兼容浏览器和 Node.js 环境
- ESM 模块支持
- 一次引入，全局生效，无需更改业务代码

## 安装

```bash
npm install charm-console
# 或
pnpm add charm-console
```

## 使用方法

只需在项目入口引入一次即可：

```js
import 'charm-console'

console.log('普通日志')
console.info('信息日志')
console.warn('警告日志')
console.error('错误日志')
```

## 效果预览

- **浏览器**：不同方法有不同的背景色，时间戳高亮显示。
- **Node.js**：不同方法有不同的渐变。

## License

MIT
