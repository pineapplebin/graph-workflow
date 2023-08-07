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
  smallGap: getCSSVariable('small-gap') || '0.6rem',
  normalGap: getCSSVariable('common-gap') || '0.8rem',
}

/**
 * px/rem 单位转换成数字 (px)
 * 其他单位不支持 返回 NaN
 */
export function stringUnitToNumberPx(value: number | string): number {
  if (typeof value === 'number') {
    return value
  } else if (/px$/.test(value)) {
    return Number(value.replace('px', ''))
  } else if (/rem$/.test(value)) {
    return Number(value.replace('rem', '')) * 10
  } else {
    return NaN
  }
}
