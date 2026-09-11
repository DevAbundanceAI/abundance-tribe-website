/* ═══════════════════════════════════════════════════════════════════
   /assessment  ·  A/B HEADLINE SPLIT  ·  Cloudflare Pages Function

   The VSL says, out loud: "The funnel you're sitting in right now?
   Built with AI. A/B testing itself as we speak." That is a checkable
   claim, so this has to actually be running whenever the video is live.

   Runs at the edge, so there is no flicker and no client-side swap a
   viewer could catch. There is deliberately no second HTML file: the
   headline is rewritten in flight, so variant B can never drift out of
   sync with the rest of the page.
   ═══════════════════════════════════════════════════════════════════ */

const EXPERIMENT = 'assessment_headline';
const COOKIE     = 'ab_assessment';
const SPLIT      = 0.5;          // share of traffic on A
const MAX_AGE    = 60 * 60 * 24 * 90;

/* Variant A is whatever is in index.html: the disqualifier headline that
   mirrors the video's opening line. Variant B is the outcome-led version. */
const VARIANT_B_H1 =
  'Find the five places AI actually pays in your business. ' +
  '<em>In one week, without hiring anyone.</em>' +
  '<span class="dot-period"></span>';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Only split the landing page itself. Assets and sub-paths pass through.
  if (!/^\/assessment\/?$/.test(url.pathname)) return next();

  // Sticky assignment, so a returning viewer never sees the page change.
  const jar = request.headers.get('Cookie') || '';
  const hit = jar.match(/(?:^|;\s*)ab_assessment=([AB])/);
  // ?ab=A / ?ab=B forces a variant, for checking our own work.
  const forced = (url.searchParams.get('ab') || '').toUpperCase();
  const variant = (forced === 'A' || forced === 'B') ? forced
                : hit ? hit[1]
                : (Math.random() < SPLIT ? 'A' : 'B');

  const upstream = await next();
  const type = upstream.headers.get('Content-Type') || '';
  if (!type.includes('text/html')) return upstream;

  const res = new Response(upstream.body, upstream);
  res.headers.append(
    'Set-Cookie',
    `${COOKIE}=${variant}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax; Secure`
  );
  // A split response must never be shared from cache.
  res.headers.set('Cache-Control', 'no-store');
  res.headers.append('Vary', 'Cookie');
  res.headers.set('X-AB-Experiment', EXPERIMENT);
  res.headers.set('X-AB-Variant', variant);

  const rewriter = new HTMLRewriter().on('body', {
    element(el) {
      el.setAttribute('data-ab', variant);
      el.setAttribute('data-ab-experiment', EXPERIMENT);
    },
  });

  if (variant === 'B') {
    rewriter.on('h1', {
      element(el) { el.setInnerContent(VARIANT_B_H1, { html: true }); },
    });
  }

  return rewriter.transform(res);
}
