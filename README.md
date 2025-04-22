# 📊 Fundamental – Stock Market Intelligence Platform

## 📚 Obsah
1. [Přehled](#přehled)
2. [Technologie](#technologie)
3. [Struktura Projektu](#struktura-projektu)
4. [Klíčové Funkce](#klíčové-funkce)
   - [📈 Akciová Data](#-akciová-data)
   - [📰 Novinky a Sentiment](#-novinky-a-sentiment)
   - [🧠 Command Palette](#-command-palette)
   - [🗓️ Makroekonomický Kalendář](#️-makroekonomický-kalendář)
   - [🔐 Autentizace](#-autentizace)
5. [Deploy a Konfigurace](#deploy-a-konfigurace)
6. [Budoucí Nápady](#budoucí-nápady)

---

## Přehled

**Fundamental** je full-stack webová aplikace poskytující aktuální data z akciového trhu, ekonomické události, zprávy a analytické nástroje pro začínající i pokročilé investory.

---

## Technologie

- **Frontend:** React (Vite), TypeScript, TailwindCSS, shadcn/ui, React Router, Recharts
- **Backend:** FastAPI, Python, yfinance, BeautifulSoup, SQLAlchemy, MySQL
- **Deployment:** Ubuntu Server + Nginx
- **Autentizace:** JWT + hashované hesla v MySQL


---

## Klíčové Funkce

### 📈 Akciová Data

- `GET /api/stock/{ticker}`  
  Vrací detailní informace o akcii.

- `GET /api/stock/{ticker}/history/:range`  
  Historická data pro cenový graf. Podporované rozsahy: `1d`, `5d`, `1m`, `3m`, `1y`, `5y`.

- `GET /api/stocks/top`  
  Scraping z CNN Markets + doplnění přes `yfinance`.

---

### 📰 Novinky a Sentiment

- `GET /api/news/latest`  
  Náhledové články s ID.

- `GET /api/news/article/:id`  
  Detail článku dle ID.

---

### 🧠 Command Palette

- Globální vyhledávání
- Spouští se pomocí `CTRL+J` nebo kliknutím na ikonu v navigaci

---

### 🗓️ Makroekonomický Kalendář

- Data pro **aktuální týden**
- Zatím staticky definována v komponentě `MacrocalendarTable.tsx`

---

### 🔐 Autentizace

- `POST /api/users/login`  
  Přihlášení s JWT odpovědí

- `POST /api/users/register`  
  Registrace s hashovaným heslem

