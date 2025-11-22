# 🚀 Deploying Multiple Projects to Vercel

When a repository contains multiple apps (e.g., `client` and `server`), deploy them as **separate Vercel projects**.

---

## 1️⃣ Add `vercel.json` inside each sub-project

Example structure:

```bash
/client/vercel.json
/server/vercel.json
```

---

## 2️⃣ Push code to GitHub

Commit + push your latest changes.

---

## 3️⃣ Deploy from the Vercel Dashboard

1. `Add New → Project → Import → Select GitHub repo`
2. In **Root Directory**, choose the sub-project folder
   e.g., `client` or `server`
3. Click **Deploy**

Repeat the same process for the second project.

---

## 4️⃣ Configure Environment Variables (if needed)

1. Open the deployed project in the Vercel Dashboard
2. `Settings → Environment Variables`
3. Add the required variables → Save
4. Click **Redeploy**

---

### ✔️ Result

Both `client` and `server` are deployed as independent Vercel projects — each with its own build settings, environment variables, and domains.

---
