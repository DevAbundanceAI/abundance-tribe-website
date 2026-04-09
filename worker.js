// ============================================
// ABUNDANCE TRIBE — A/B TEST WORKER
// Deploy this as a Cloudflare Worker
// Splits traffic between page variants at the edge
// ============================================

const AB_TESTS = {
  // Define your experiments here
  // key: experiment name (must match PostHog experiment key)
  // variants: array of page paths to serve
  // split: percentage for variant A (remainder goes to B, C, etc.)
  homepage: {
    variants: ['/index.html', '/index-b.html'],
    split: 50, // 50% get variant A, 50% get variant B
  },
  // apply_page: {
  //   variants: ['/apply.html', '/apply-b.html'],
  //   split: 50,
  // },
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname

    // Check if this path has an active A/B test
    const testKey = getTestKeyForPath(path)
    if (!testKey) {
      return fetch(request)
    }

    const test = AB_TESTS[testKey]

    // Read or assign variant via cookie
    const cookieHeader = request.headers.get('Cookie') || ''
    const cookieName = `ab_${testKey}`
    let variant = getCookieValue(cookieHeader, cookieName)

    if (!variant) {
      // Assign variant based on split
      const rand = Math.random() * 100
      variant = rand < test.split ? 'A' : 'B'
    }

    const variantIndex = variant.charCodeAt(0) - 65 // A=0, B=1, C=2...
    const servePath = test.variants[variantIndex] || test.variants[0]

    // Fetch the correct variant
    const variantUrl = new URL(request.url)
    variantUrl.pathname = servePath
    const response = await fetch(variantUrl.toString())

    // Set cookie so visitor stays in same variant
    const newResponse = new Response(response.body, response)
    newResponse.headers.append(
      'Set-Cookie',
      `${cookieName}=${variant}; Path=/; Max-Age=2592000; SameSite=Lax`
    )

    return newResponse
  },
}

function getTestKeyForPath(path) {
  if (path === '/' || path === '/index.html') return 'homepage'
  // Add more path mappings as you add experiments
  // if (path === '/apply' || path === '/apply.html') return 'apply_page'
  return null
}

function getCookieValue(cookieHeader, name) {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? match[1] : null
}
