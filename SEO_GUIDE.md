# TCG Game Mats - SEO Implementation Guide

## ✅ What I've Already Implemented

### 1. **Enhanced Meta Tags** (index.html)
- ✅ Primary meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags for social media
- ✅ Canonical URL (prevents duplicate content issues)
- ✅ Theme color and mobile app tags
- ✅ Structured data (JSON-LD) for WebApplication & Organization

### 2. **Dynamic Meta Management** (useSEO hook)
- ✅ `src/hooks/useSEO.js` — Updates meta tags without external dependencies
- ✅ Integrated into `App.jsx`
- Usage: `useSEO({ title: '...', description: '...' })`

### 3. **Robots & Sitemap**
- ✅ `public/robots.txt` — Guides search engine crawlers
- ✅ `public/sitemap.xml` — Helps search engines discover your page

---

## 🚨 CRITICAL: What YOU Need to Do

### 1. **Create an Open Graph Image** (og-image.png)
This is the **most important** remaining SEO task. Create a 1200×630px image and save as `/public/og-image.png`:

**What should be in it:**
- TCG Game Mats logo/branding
- Clear text: "TCG Game Mats Designer"
- Visual example of a playmat
- Call to action: "Create Custom Playmats Free"

**Why:** This image appears when:
- Someone shares your link on Twitter/Discord/Facebook
- Search engines preview your site
- Better social sharing = more clicks and traffic

**Tools to create:**
- Canva (easiest, free)
- Figma
- Photoshop
- Or hire a designer on Fiverr (~$20-50)

---

### 2. **Add GitHub Link to UI** (Optional but Recommended)
Show credibility by linking to your open-source repo. Add this to your footer/header:

```jsx
<a href="https://github.com/Frooodle/TCG-Game-Mats" target="_blank" rel="noopener noreferrer">
  GitHub
</a>
```

Benefits:
- Builds trust (shows active development)
- Generates backlinks (good for SEO)
- Shows open-source credibility
- Discord/Reddit users appreciate it

---

## 📊 Performance Optimization (Core Web Vitals)

These directly impact your SEO ranking:

### Largest Contentful Paint (LCP)
- **Current:** Canvas rendering may be slow
- **Fix:**
  ```bash
  npm run build
  # Check production bundle size
  vite --debug
  ```
- Consider lazy-loading heavy components

### First Input Delay (FID)
- **Current:** Should be fine for this app
- **Monitor:** Use Chrome DevTools → Lighthouse

### Cumulative Layout Shift (CLS)
- **Current:** Likely good (fixed layout)
- **Monitor:** Ensure no images push layout around

### Check your Core Web Vitals:
```bash
# Use lighthouse
npm install -g lighthouse
lighthouse https://www.tcggamemats.com/
```

---

## 🔍 Technical SEO Checklist

### Mobile Responsiveness
- ✅ Viewport meta tag configured
- ⚠️ **Action:** Test on mobile
  - Open in Chrome DevTools → Mobile view
  - Check canvas rendering on phone
  - Ensure buttons are touch-friendly

### Page Speed
- ⚠️ **Action:** Monitor with:
  - Google PageSpeed Insights: https://pagespeed.web.dev/
  - Lighthouse (built into DevTools)
  - GTmetrix: https://gtmetrix.com/

### Accessibility (Indirect SEO benefit)
- ⚠️ **Action:** Improve semantic HTML
  - Add `<h1>` tag with your app name
  - Add `role="application"` to main container
  - Add `aria-labels` to buttons
  - Use semantic HTML: `<nav>`, `<section>`, `<article>`

### Security
- ✅ HTTPS enforced (required)
- ✅ Canonical URL set
- ⚠️ **Action:** Monitor with:
  - SSL Labs: https://www.ssllabs.com/ssltest/
  - Security Headers: https://securityheaders.com/

---

## 📈 Content Strategy

### Keywords to Target (High Value)
- "Riftbound playmat"
- "TCG mat designer"
- "League of Legends playmat"
- "Free playmat maker"
- "Custom card game mat"

### Where to Optimize Keywords
1. **Page title:** ✅ Already done
2. **Meta description:** ✅ Already done
3. **H1 heading:** ⚠️ Add to app
4. **Content mentions:** Mention in README, docs

### Content Ideas (for blog/docs)
If you add a blog section, write about:
- "How to Design a Riftbound Playmat"
- "Best Practices for TCG Mat Layouts"
- "Customizing Your League of Legends Mat"
- "Free Tools for Card Game Mat Design"

---

## 🔗 Link Building Strategy

### Backlinks (Very Important for SEO)
Get other websites to link to you:

1. **Reddit Communities:**
   - r/LoR (Legends of Runeterra)
   - r/leagueoflegends
   - r/tabletopgames
   - r/tcg
   - Post: "I made a free playmat designer, check it out!"

2. **Discord Communities:**
   - LoR Discord
   - TCG communities
   - Share your tool in #self-promotion channels

3. **Twitter/X:**
   - Post about updates
   - Share playmat designs
   - Engage with LoR/TCG communities

4. **GitHub:**
   - Your repo already has README
   - Add to awesome-lists:
     - awesome-riftbound
     - awesome-tcg-tools
     - awesome-card-games

5. **Local Listings:**
   - Add to tool directories
   - LocalBusiness schema (if you ever expand)

---

## 📊 Monitoring & Analytics

### Setup Google Analytics 4
```bash
# Add to index.html before closing </head>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Monitor with Google Search Console
- URL: https://search.google.com/search-console/about
- Add your domain
- Monitor: rankings, clicks, impressions, CTR

### Bing Webmaster Tools
- URL: https://www.bing.com/webmasters/
- Helps Bing index your site

---

## 🚀 SEO Quick Wins (High Impact, Quick to Do)

1. **⭐ Create og-image.png** — MOST IMPORTANT (30 mins)
2. **Upload production build** — Make sure all changes go live
3. **Submit to search engines:**
   - Google: https://search.google.com/search-console/about
   - Bing: https://www.bing.com/webmasters/
4. **Test with Lighthouse** (5 mins)
   - Chrome DevTools → Lighthouse
   - Aim for 90+ in all categories
5. **Add GitHub link to footer** (5 mins)
6. **Post on Reddit/Discord** (15 mins)

---

## 📋 Long-term SEO Roadmap

### Month 1 (This Month)
- [x] Core meta tags & structured data
- [ ] Create og-image.png
- [ ] Deploy to production
- [ ] Submit to Google Search Console
- [ ] Test Core Web Vitals

### Month 2
- [ ] Add analytics (GA4)
- [ ] Build backlinks (Reddit, Discord)
- [ ] Monitor search console
- [ ] Create first blog post (optional)

### Month 3+
- [ ] Expand content (guides, tutorials)
- [ ] Build community (GitHub discussions)
- [ ] Monitor rankings in Search Console
- [ ] Iterate on design based on analytics

---

## 🛠️ Technical Files Added

1. **index.html** — Enhanced meta tags, OG, Twitter, structured data
2. **src/hooks/useSEO.js** — Dynamic meta tag management
3. **public/robots.txt** — Search engine crawler guidance
4. **public/sitemap.xml** — Page discovery for crawlers
5. **SEO_GUIDE.md** (this file)

---

## ❓ FAQ

**Q: Will my SEO improve immediately?**
A: No. Google takes 2-8 weeks to re-crawl and re-index. Be patient.

**Q: What if I don't create the og-image?**
A: Social shares will look ugly/generic. People are less likely to click.

**Q: Do I need to hire an SEO agency?**
A: Not for a free tool. Follow this guide and you'll do well. Only hire if you have a commercial product.

**Q: Can I use a different domain?**
A: Yes, but update canonical URL and all `tcggamemats.com` references in index.html.

---

## 📞 Need Help?

- Google Search Console Help: https://support.google.com/webmasters/
- SEO Starter Guide: https://developers.google.com/search/docs/beginner/seo-starter-guide
- Schema.org: https://schema.org/ (structured data reference)
- Moz SEO Guide: https://moz.com/beginners-guide-to-seo/ (great resource)

---

**Last Updated:** 2026-02-24
