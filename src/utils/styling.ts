/**
 * 获取全局定义的 CSS 变量
 */
export function getCSSVariable(name: string): string {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(`--${name}`) ||
    ''
  ).trim()
}

/**
 * 常用的 CSS 变量
 */
export const STYLING = {
  normalGap: getCSSVariable('common-gap') || '8px',
}
