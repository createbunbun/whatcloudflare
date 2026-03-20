# Cloudflare Guide (Unofficial / 非公式)

Cloudflareの無料サービスを初心者にもわかりやすく解説するガイドサイトです。  
A beginner-friendly guide to Cloudflare's free services.

> ⚠️ This is an unofficial site. Please verify information at [cloudflare.com](https://www.cloudflare.com/).

## Features

- **Multi-language**: Japanese, English, Chinese, Korean, Spanish, French, German, Portuguese (auto-detected, switchable)
- **Beginner-friendly**: No jargon without explanation
- **Honest about costs**: Clearly states what's free AND what's paid
- **No build tools**: Plain HTML/CSS/JS — works directly in any browser

## Files

```
index.html  … Entry point
style.css   … Stylesheet
app.js      … Application (data + routing + views, ~50KB)
```

## Local Preview

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .
```

Open `http://localhost:8000` in your browser.

## Deploy to GitHub Pages

1. Create a repository on GitHub (e.g., `cloudflare-guide`)
2. Push these 3 files (+ README):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<USERNAME>/cloudflare-guide.git
git push -u origin main
```

3. Go to **Settings → Pages → Source** → select `main` / `/ (root)`
4. Your site will be live at `https://<USERNAME>.github.io/cloudflare-guide/`

## Pages

| Page | Hash |
|------|------|
| Home | `#/` |
| All Services | `#/services` |
| What It Does | `#/intuitive` |
| Free Limits | `#/limits` |
| Use Cases | `#/usecases` |
| About | `#/about` |
| Category Detail | `#/category/{id}` |
| Service Detail | `#/service/{id}` |

## Tech

- **Fonts**: [Noto Sans JP/SC/KR](https://fonts.google.com/noto) (OFL license, commercial use OK)
- **Dependencies**: Google Fonts CDN only
- **Architecture**: MVC in vanilla JS (Model: data/translations, View: renderers, Controller: router/i18n)
- **Created by**: Claude (Anthropic AI)

## License

Source code is freely available.  
Cloudflare is a trademark of Cloudflare, Inc.
