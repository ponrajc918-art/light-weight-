# 🚀 Light Weight Jewellery - Setup & Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Prerequisites Check
```bash
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

**Output:**
```
  VITE v4.4.5  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Your website is now live at http://localhost:5173/**

### Step 4: Start Shopping
1. Open http://localhost:5173 in your browser
2. Browse products
3. Add items to cart
4. Click "Order via WhatsApp"

---

## 📱 Testing Checklist

### Desktop Testing
```bash
# Open in Chrome/Firefox/Safari
http://localhost:5173

□ Hero page loads with animations
□ Search works
□ Category filters work
□ Add to cart works
□ Cart drawer opens smoothly
□ Quick view modal works
□ WhatsApp button opens URL
□ All pages navigate correctly
□ Admin panel accessible (if needed)
```

### Mobile Testing
```bash
# Using Chrome DevTools
1. Press F12 or Cmd+Option+I
2. Click device toolbar icon
3. Select different devices
4. Test:
   □ Touch scrolling smooth
   □ Cart drawer opens on mobile
   □ Buttons are tap-friendly
   □ Images load correctly
   □ Text is readable
   □ Navigation is accessible
```

### Real Device Testing
```bash
# On your phone
1. Get your computer's IP: ipconfig (Windows) or ifconfig (Mac/Linux)
2. Open http://YOUR_IP:5173 on your phone
3. Test all features on actual device
4. Test WhatsApp integration
```

---

## 🏗️ Project Structure Explanation

```
light-weight-jewellery/
│
├── index.html
│   └── Root HTML file (single entry point)
│
├── main.jsx
│   └── React DOM render (mounts App to #root)
│
├── App.jsx
│   └── MAIN APP FILE - All features included here:
│       ├── Product data (14 items)
│       ├── Home/Shop/About pages
│       ├── Shopping cart logic
│       ├── Admin panel
│       ├── Search & filter
│       ├── WhatsApp integration
│       ├── localStorage persistence
│       └── All UI components
│
├── index.css
│   └── Global styles:
│       ├── Tailwind directives
│       ├── Custom animations
│       ├── Premium styling
│       └── Utility classes
│
├── package.json
│   └── Dependencies:
│       ├── react
│       ├── react-dom
│       ├── framer-motion
│       ├── lucide-react
│       ├── tailwindcss
│       └── vite
│
├── vite.config.js
│   └── Vite build configuration
│
├── tailwind.config.js
│   └── Tailwind CSS configuration
│
├── postcss.config.js
│   └── PostCSS configuration for Tailwind
│
├── README.md
│   └── Project overview and quick start
│
├── FEATURES.md
│   └── Complete feature documentation
│
├── SETUP.md
│   └── This file - setup guide
│
└── .gitignore
    └── Git ignore rules
```

---

## 🔧 Configuration Guide

### Change WhatsApp Number
**File:** `App.jsx`
**Find:** Line with `+919677690323`
**Replace with:** Your WhatsApp number

```javascript
// Around line 280
window.open(`https://wa.me/YOUR_NUMBER?text=${message}`, '_blank');
```

### Change Admin Password
**File:** `App.jsx`
**Find:** `handleAdminLogin` function
**Replace:** `lightweight2024` with your password

```javascript
if (password === 'YOUR_PASSWORD_HERE') {
  setIsAdminMode(true);
  // ...
}
```

### Add More Products
**File:** `App.jsx`
**Find:** `initialProducts` array (around line 20)
**Add:** New product object

```javascript
{
  id: 15,
  name: 'Your Product Name',
  price: 999,
  category: 'Earrings',
  image: 'https://image-url.jpg',
  description: 'Product description',
  featured: false,
  rating: 4.8
}
```

### Customize Colors
**File:** `tailwind.config.js`

```javascript
theme: {
  extend: {
    colors: {
      'custom-gold': '#YOUR_COLOR',
    },
  },
}
```

### Change Brand Name
**File:** `App.jsx`
**Find:** All instances of "Light Weight"
**Replace:** With your brand name

---

## 🚢 Deployment Guide

### Option 1: Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Follow prompts
# Choose project name
# Link to GitHub (optional)
# Deploy
```

**Your site will be live at:** `https://yourproject.vercel.app`

### Option 2: Netlify

```bash
# 1. Build the project
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

```bash
# 1. Create GitHub repository
# 2. Update package.json
"homepage": "https://yourusername.github.io/repo-name"

# 3. Build
npm run build

# 4. Commit and push to main branch
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# 5. Go to repo settings
# Settings → Pages → Deploy from main → /dist folder
```

### Option 4: Traditional Hosting (cPanel, etc.)

```bash
# 1. Build
npm run build

# 2. Upload `dist` folder contents to hosting
# 3. Configure .htaccess for SPA routing
# 4. Site will be live at your domain
```

**Sample .htaccess for SPA:**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔐 Environment Variables (Future Use)

Create `.env.local` file:
```env
VITE_WHATSAPP_NUMBER=919677690323
VITE_ADMIN_PASSWORD=lightweight2024
VITE_API_URL=https://api.example.com
```

Access in code:
```javascript
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
```

---

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use
```bash
# Solution 1: Use different port
npm run dev -- --port 3000

# Solution 2: Kill process using port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

### Issue: Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Vite Not Starting
```bash
# Check if port is already in use
# Try different port:
npm run dev -- --port 5000

# Check for syntax errors
# Look at terminal output for error messages
```

### Issue: localStorage Not Working
- Open DevTools (F12)
- Check Application → localStorage
- Ensure localStorage is enabled
- Try in incognito/private mode
- Check for quota limits

### Issue: WhatsApp Not Opening
- Ensure number has country code (+91 for India)
- Format: `+919677690323` (no spaces or dashes)
- On desktop: WhatsApp Web opens in browser
- On mobile: WhatsApp app opens automatically
- Some browsers may block popups

### Issue: Images Not Loading
- Check image URLs are valid
- Ensure URLs are HTTPS (not HTTP)
- Replace with working image URLs
- Use placeholder images if needed

### Issue: Animations Stuttering
- Close unnecessary browser tabs
- Disable browser extensions
- Clear browser cache
- Test in different browser
- Check GPU acceleration is enabled

---

## 🔄 Git Workflow

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Light Weight Jewellery ecommerce site"
```

### Create GitHub Repository
```bash
# 1. Go to github.com
# 2. Create new repository
# 3. Copy HTTPS URL
# 4. Add remote:
git remote add origin https://github.com/yourusername/light-weight-jewellery.git
git branch -M main
git push -u origin main
```

### Deploy from GitHub
```bash
# Push to main branch
git add .
git commit -m "Update: Add new features"
git push origin main

# Vercel/Netlify auto-deploys from main branch
```

---

## 📊 Performance Monitoring

### Build Size Analysis
```bash
npm run build

# Check dist folder size
# Should be under 500KB gzipped
```

### Page Speed Test
- Go to https://pagespeed.web.dev
- Enter your deployed URL
- Check performance metrics
- Optimize if needed

### Bundle Analysis
```bash
# Install analyzer
npm install --save-dev rollup-plugin-visualizer

# Update vite.config.js to use it
# Run build and view visualization
```

---

## 🔒 Security Checklist

- [ ] Admin password is strong (not `lightweight2024` in production)
- [ ] WhatsApp number is correct
- [ ] No sensitive data in localStorage
- [ ] HTTPS enabled on deployment
- [ ] CSP headers configured
- [ ] CORS headers configured (if using API)
- [ ] No API keys exposed in code
- [ ] Environment variables used for sensitive data
- [ ] Rate limiting on WhatsApp integration
- [ ] Input validation in admin panel

---

## 📈 Analytics Setup (Future)

### Google Analytics
```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Hotjar
```html
<!-- Add to index.html before </body> -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:12345,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');
        r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## 💡 Pro Tips

1. **Use `.env` files** for sensitive configuration
2. **Keep dependencies updated**: `npm update`
3. **Test on real devices** before deploying
4. **Monitor 404 errors** after deployment
5. **Set up auto-deployments** from GitHub
6. **Enable HTTPS** on production
7. **Use CDN** for faster image loading
8. **Implement caching** headers
9. **Monitor performance** metrics
10. **Get SSL certificate** for your domain

---

## 🎓 Next Learning Steps

1. **React Advanced**: State management with Redux
2. **Backend**: Node.js + Express
3. **Database**: MongoDB or Firebase
4. **Authentication**: Firebase Auth or JWT
5. **Payments**: Razorpay or Stripe integration
6. **DevOps**: Docker and Kubernetes
7. **Testing**: Jest and React Testing Library
8. **CI/CD**: GitHub Actions

---

## 📞 Support Resources

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Vercel Docs**: https://vercel.com/docs

---

## ✨ You're All Set!

Your Light Weight Jewellery website is ready to go live. Start with:

```bash
npm install
npm run dev
```

Then customize, test, and deploy to your favorite platform.

**Happy coding! 🎉**

---

*Made with ❤️ for Light Weight Jewellery*
