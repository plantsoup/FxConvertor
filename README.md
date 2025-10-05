# FxConvertor  

## Overview  
FxConvertor is a currency‑conversion application that:

* Provides **real‑time exchange rates**.  
* Supports **direct currency conversions**.  
* Uses a **Cloudflare Worker** to fetch data from a **GraphQL API**, delivering fast and efficient performance.  

---  

## Features  

- **Real‑Time Exchange Rates** – Access the latest currency rates.  
- **Direct Currency Conversion** – Convert amounts between any two supported currencies.  
- **Cloudflare Worker Backend** – All API calls are handled by a Cloudflare Worker.  
- **GraphQL API Integration** – Data is retrieved from a GraphQL endpoint.  

---  

## Architecture  

```
+-------------------+        +-------------------+        +-------------------+
|   Frontend (React|        |  Cloudflare Worker|        |   GraphQL API     |
|   + TypeScript)  | <----> |  (Backend)        | <----> |   (Data source)   |
+-------------------+        +-------------------+        +-------------------+
```

* **Frontend** – React + TypeScript UI.  
* **Backend** – Cloudflare Worker that forwards requests to the GraphQL API.  
* **API Integration** – Worker queries the GraphQL endpoint for currency data.  

---  

## Getting Started  

### Prerequisites  

- **Node.js** ≥ 16  
- **npm** (Node Package Manager)  

### Installation  

```bash
# 1️⃣ Clone the repository
git clone https://github.com/plantsoup/FxConvertor.git
cd FxConvertor

# 2️⃣ Install dependencies
npm install
```

### Environment variables  

Create a `.env` file in the project root with the following content:

```dotenv
API_URL=your_api_url
API_KEY=your_api_key
```

Replace `your_api_url` and `your_api_key` with the values supplied by your API provider.  

### Running locally  

```bash
npm run dev
```

Open **http://localhost:3000** in a browser to view the app.  

---  

## Deployment  

### 1️⃣ Build the frontend  

```bash
npm run build
```

Deploy the generated `dist/` (or `build/`) folder to any static‑hosting service (e.g., Netlify, Vercel, Cloudflare Pages).  

### 2️⃣ Deploy the Cloudflare Worker  

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Authenticate with Cloudflare
wrangler login

# Publish the worker
wrangler publish
```

---  

## Usage  

| Feature                | URL pattern                                 | Example                                                                 |
|------------------------|---------------------------------------------|-------------------------------------------------------------------------|
| Latest rates           | `/latest`                                   | `https://yourdomain.com/latest`                                         |
| Currency conversion    | `/convert?from=USD&to=EUR&amount=100`       | `https://yourdomain.com/convert?from=USD&to=EUR&amount=100`            |

---  

## Contributing  

1. Fork the repository.  
2. Create a new branch (`git checkout -b feature/awesome-feature`).  
3. Commit your changes (`git commit -m "Add awesome feature"`).  
4. Push the branch (`git push origin feature/awesome-feature`).  
5. Open a Pull Request.  

All contributions are welcome—just follow the standard GitHub workflow.  

---  

## License  

This project is licensed under the **MIT License**. See the `LICENSE` file for details.  

---  

*If anything still looks off or you need additional sections, just let me know!*
