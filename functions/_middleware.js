/* ═══════════════════════════════════════════════════════════════════
   SITE-WIDE MIDDLEWARE

   1. Old-domain redirect. findabundance.ai and tryabundance.ai are both
      still attached to this Pages project, so without this they serve a
      second, complete copy of the site. Two live copies of the same
      content split any signal and confuse crawlers, and the canonical
      tags alone only tell search engines which to prefer. They do not
      stop a human landing on the wrong one.

      Done here rather than as a dashboard Redirect Rule so it lives in
      the repo, is reviewable, and cannot be silently lost.

   2. Retired-path rescue. /tribe, /shift, /unlocked, /freedom and
      /partner are archived tiers still linked from the old nav script.
      Cloudflare Pages answers unknown paths with the homepage and a 200,
      so today those links quietly serve the wrong page while looking
      fine. A real 301 is more honest and keeps the link equity.
   ═══════════════════════════════════════════════════════════════════ */

const CANONICAL = 'weareabundance.com';
const OLD_HOSTS = ['findabundance.ai', 'www.findabundance.ai',
                   'tryabundance.ai',  'www.tryabundance.ai'];

const RETIRED = {
  '/tribe': '/', '/shift': '/', '/unlocked': '/',
  '/freedom': '/', '/partner': '/',
};

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  if (OLD_HOSTS.includes(host)) {
    const to = new URL(url.pathname + url.search, `https://${CANONICAL}`);
    return Response.redirect(to.toString(), 301);
  }

  const path = url.pathname.replace(/\/+$/, '') || '/';
  if (RETIRED[path]) {
    return Response.redirect(new URL(RETIRED[path], url.origin).toString(), 301);
  }

  return next();
}
