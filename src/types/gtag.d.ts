// Google Analytics gtag 타입 선언
declare function gtag(
  command: 'config' | 'set' | 'event',
  targetId: string,
  config?: Record<string, any>
): void

declare function gtag(
  command: 'event',
  eventName: string,
  eventParameters?: Record<string, any>
): void