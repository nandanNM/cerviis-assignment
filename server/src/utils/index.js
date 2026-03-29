export function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

export function getErrorRate() {
  return Number((5 + getRandom(-1, 1)).toFixed(2)) 
}

export function getStatus(errorRate) {
  if (errorRate > 6) return "critical"
  if (errorRate > 5) return "warning"
  return "healthy"
}

export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

