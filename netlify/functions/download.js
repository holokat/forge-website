const RELEASES = {
  forge: {
    repo: 'holokat/forge',
    label: 'Forge for Mac',
    assetPatterns: [/^Forge-latest-arm64\.dmg$/i, /^Forge-\d+\.\d+\.\d+-arm64\.dmg$/i]
  },
  'forge-buddy': {
    repo: 'holokat/forge-buddy',
    label: 'Forge Buddy for iOS',
    assetPatterns: [/^ForgeBuddy-latest\.ipa$/i, /^ForgeBuddy-\d+\.\d+\.\d+\.ipa$/i]
  }
}

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store'
    },
    body
  }
}

exports.handler = async (event) => {
  const app = event.queryStringParameters?.app || ''
  const config = RELEASES[app]
  if (!config) return response(404, 'Unknown download.')

  const apiUrl = `https://api.github.com/repos/${config.repo}/releases/latest`
  const releaseResponse = await fetch(apiUrl, {
    headers: {
      accept: 'application/vnd.github+json',
      'user-agent': 'forge-website-download-router'
    }
  })

  if (!releaseResponse.ok) {
    return response(404, `${config.label} does not have a public release yet.`)
  }

  const release = await releaseResponse.json()
  const assets = Array.isArray(release.assets) ? release.assets : []
  const asset = assets.find((candidate) =>
    config.assetPatterns.some((pattern) => pattern.test(candidate.name || ''))
  )

  if (!asset?.browser_download_url) {
    return response(404, `${config.label} does not have a downloadable release asset yet.`)
  }

  return {
    statusCode: 302,
    headers: {
      location: asset.browser_download_url,
      'cache-control': 'public, max-age=300'
    },
    body: ''
  }
}
