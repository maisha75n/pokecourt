# Troubleshooting Guide

## If the site isn't working, here are common fixes:

### 1. Install Dependencies First

**If running locally:**
```bash
# Install Node.js first (if not installed):
# Download from https://nodejs.org/ (install LTS version)

# Then install project dependencies:
npm install

# Run the development server:
npm run dev
```

### 2. If Deployed to Vercel

Check for build errors:
1. Go to your Vercel dashboard
2. Click on your project
3. Check the "Deployments" tab
4. Look for any build errors

Common build errors and fixes:

#### Error: "Cannot find module '@/data/cards.json'"
**Fix:** Make sure `src/data/cards.json` exists and is committed to git.

#### Error: "Module not found" or TypeScript errors
**Fix:** Ensure all files are pushed to GitHub:
```bash
git add .
git commit -m "Fix: Ensure all files are committed"
git push
```

#### Error: Build timeout or memory issues
**Fix:** This shouldn't happen with this project, but if it does, check Vercel logs.

### 3. If Pages Are Blank or Not Loading

**Check browser console (F12):**
- Look for JavaScript errors
- Check Network tab for failed requests

**Common issues:**
- Missing `cards.json` file
- Import path errors
- Missing dependencies

### 4. Quick Fixes

**Reset everything and start fresh:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run dev
```

### 5. Verify File Structure

Make sure you have:
- ✅ `src/data/cards.json` (with 10 sample cards)
- ✅ `public/placeholder.svg` 
- ✅ `package.json`
- ✅ All component files in `src/components/`
- ✅ All route files in `src/app/`

### 6. If Images Aren't Showing

- Check that `/public/placeholder.svg` exists
- Verify image paths in `cards.json` start with `/`
- For custom images, add them to `/public/cards/` and reference as `/cards/filename.jpg`

### 7. Check TypeScript Errors

```bash
npm run build
```

This will show any TypeScript or build errors.

---

**Still having issues?** Share:
1. Where is it running? (Local dev server, Vercel, etc.)
2. What error messages do you see? (Browser console, build logs)
3. What page/feature isn't working?

