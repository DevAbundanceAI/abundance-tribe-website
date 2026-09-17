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

   3. Repo-doc block. Markdown in the repo is internal documentation.

   2. Retired-path rescue. /tribe, /shift, /unlocked, /freedom and
      /partner are archived tiers still linked from the old nav script.
      Cloudflare Pages answers unknown paths with the homepage and a 200,
      so today those links quietly serve the wrong page while looking
      fine. A real 301 is more honest and keeps the link equity.

   4. Archive block. The same retired pages also sit under /archive/, and
      Pages served every one of them at 200. They carry retired prices
      and proof that contradicts the reconciled set, so the 301 above was
      only closing the front door. They stay in the repo for reference.
   ═══════════════════════════════════════════════════════════════════ */

const CANONICAL = 'weareabundance.com';
const OLD_HOSTS = ['findabundance.ai', 'www.findabundance.ai',
                   'tryabundance.ai',  'www.tryabundance.ai'];

const RETIRED = {
  '/tribe': '/', '/shift': '/', '/unlocked': '/',
  '/freedom': '/', '/partner': '/',
  // Both of these were still serving a retired offer. /selling-system
  // carried a $27,500/mo price table and $12M of proof that does not
  // reconcile; /free sold a $97/mo membership and was not even noindexed,
  // so it was the one retired page a crawler could still pick up. Nothing
  // on the live site links to either. The files stay in the repo, so
  // rebuilding either one as a real page is still open.
  '/selling-system': '/', '/free': '/',
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

  // 3. Repo docs are not pages. Pages serves every file in the repo, so
  //    BRAND.md, OFFERS.md (retired prices) and the research notes were all
  //    readable at the domain. Nothing on the site links to a .md file.
  if (/\.md$/i.test(url.pathname)) {
    return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  // 4. The archived tier pages. /tribe and /partner 301 above, but their
  //    files live on at /archive/tribe and /archive/partner and were being
  //    served whole: $197/mo and $397/mo price tables, and $12M and $2.8M
  //    proof that no longer reconciles. Send them where the live ones go.
  if (/^\/archive(\/|$)/i.test(url.pathname)) {
    return Response.redirect(new URL('/', url.origin).toString(), 301);
  }

  return next();
}
