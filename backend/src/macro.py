# src/macro_forexfactory.py
from fastapi import APIRouter
from playwright.sync_api import sync_playwright

router = APIRouter()

@router.get("/macro/forexfactory")
def get_forexfactory_events():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=100)  # visible browser for debug
        page = browser.new_page()

        page.goto("https://www.forexfactory.com/calendar", timeout=60000)

        # Wait until the table is visible
        page.wait_for_selector("table", timeout=30000)

        # Manually scroll to bottom to trigger JS render
        page.mouse.wheel(0, 5000)
        page.wait_for_timeout(3000)  # wait a bit for render

        # Now grab all rows in calendar
        rows = page.query_selector_all("table tr")

        events = []
        current_day = None

        for row in rows:
            # Day row
            day_span = row.query_selector("span.date")
            if day_span:
                current_day = day_span.inner_text().strip()

            currency_span = row.query_selector("td.calendar__cell.calendar__currency span")
            event_span = row.query_selector("td.calendar__cell.calendar__event span")
            actual_span = row.query_selector("td.calendar__cell.calendar__actual span")
            forecast_span = row.query_selector("td.calendar__cell.calendar__forecast span")
            previous_span = row.query_selector("td.calendar__cell.calendar__previous span")

            if currency_span and event_span:
                events.append({
                    "day": current_day,
                    "currency": currency_span.inner_text().strip(),
                    "event": event_span.inner_text().strip(),
                    "actual": actual_span.inner_text().strip() if actual_span else None,
                    "forecast": forecast_span.inner_text().strip() if forecast_span else None,
                    "previous": previous_span.inner_text().strip() if previous_span else None,
                })

        browser.close()
        return {"events": events}

get_forexfactory_events()