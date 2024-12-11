function saveAccessTokenToCookie(value) {
  document.cookie = `accessToken=${value}; path=/`
}
function saveRefreshTokenToCookie(value) {
  document.cookie = `refreshToken=${value}; path=/`
}

function saveUserToCookie(value) {
  document.cookie = `bookmark_user=${value}`
}

function saveHideAlertToCookie(value) {
  document.cookie = `hide_alert=${value}; path=/`
}

function saveAutoCategorizeSettingFromCookie(value) {
  document.cookie = `auto_categorized=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`
}

function saveSocialInfoToCookie(value) {
  document.cookie = `social_info=${value}; path=/`
}

function saveCustomPageNameToCookie(value) {
  document.cookie = `custompage_name=${value}; path=/`
}

function getAccessTokenFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getRefreshTokenFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getUserFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)bookmark_user\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getHideAlertFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)hide_alert\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getSocialInfoFromCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)social_info\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getCustomPageNameToCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)custompage_name\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getAutoCategorizeSettingFromCookie() {
  const cookieValue = document.cookie.replace(
    /(?:(?:^|.*;\s*)auto_categorized\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )

  // 쿠키 값이 비어있는 경우 기본값(true) 반환
  if (!cookieValue) {
    saveAutoCategorizeSettingFromCookie(true)
    return true
  }

  try {
    return JSON.parse(cookieValue)
  } catch (error) {
    console.warn('자동 분류 설정 쿠키 파싱 실패:', error)
    return false // 또는 적절한 기본값
  }
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`
}

export {
  saveAccessTokenToCookie,
  saveUserToCookie,
  getAccessTokenFromCookie,
  saveRefreshTokenToCookie,
  getRefreshTokenFromCookie,
  getUserFromCookie,
  deleteCookie,
  saveHideAlertToCookie,
  getHideAlertFromCookie,
  saveAutoCategorizeSettingFromCookie,
  getAutoCategorizeSettingFromCookie,
  saveSocialInfoToCookie,
  getSocialInfoFromCookie,
  getCustomPageNameToCookie,
  saveCustomPageNameToCookie
}
