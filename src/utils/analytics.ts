// GA4 이벤트 전송을 위한 유틸리티 함수
/// <reference path="../types/gtag.d.ts" />

interface GA4EventParams {
  user_id?: string
  country?: string
  content_id?: string | number
  category_id?: string | number
  ai_category_suggested?: boolean
  is_category_modified?: boolean
  content_save_at?: string
  device_type?: string
  [key: string]: any
}

// 디바이스 타입 감지
export function getDeviceType(): string {
  const userAgent = navigator.userAgent.toLowerCase()
  
  if (/tablet|ipad|playbook|silk|(android(?!.*mobile))/.test(userAgent)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android.*mobile|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
    return 'mobile'
  }
  return 'desktop'
}

// 국가 정보 가져오기 (IP 기반)
export async function getCountryCode(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/country_code/')
    const country = await response.text()
    return country.trim().toUpperCase()
  } catch (error) {
    console.warn('Failed to get country code:', error)
    return 'UNKNOWN'
  }
}

// 사용자 ID 가져오기 (토큰에서 추출하거나 로컬 스토리지에서)
export function getUserId(): string {
  // JWT 토큰에서 사용자 ID를 추출하거나
  // 로컬 스토리지에서 가져올 수 있습니다
  const token = localStorage.getItem('token')
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.sub || payload.user_id || payload.id || 'anonymous'
    } catch (error) {
      console.warn('Failed to parse token:', error)
      return 'anonymous'
    }
  }
  return 'anonymous'
}

// GA4 이벤트 전송 함수
export async function sendGA4Event(eventName: string, params: GA4EventParams = {}) {
  try {
    // 공통 매개변수 추가
    const commonParams: GA4EventParams = {
      user_id: getUserId(),
      country: await getCountryCode(),
      device_type: getDeviceType(),
      content_save_at: new Date().toISOString(),
      ...params
    }

    // gtag 함수가 존재하는지 확인
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, commonParams)
      console.log(`GA4 Event Sent: ${eventName}`, commonParams)
    } else {
      console.warn('gtag is not available')
    }
  } catch (error) {
    console.error('Failed to send GA4 event:', error)
  }
}

// content_save 이벤트 전용 함수
export async function sendContentSaveEvent(params: {
  content_id: string | number
  category_id: string | number
  ai_category_suggested?: boolean
  is_category_modified?: boolean
}) {
  await sendGA4Event('content_save', params)
}