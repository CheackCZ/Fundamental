# playwright_runner.py
import json
from playwright.sync_api import sync_playwright

def scrape():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://edition.cnn.com/markets/fear-and-greed", timeout=20000)
        page.wait_for_timeout(3000)

        current_value = page.locator("span.market-fng-gauge__dial-number-value").nth(0).inner_text().strip()
        historical_elements = page.locator("div.market-fng-gauge__historical-item-index-value").all()
        historical_values = [el.inner_text().strip() for el in historical_elements]
        browser.close()
        print(json.dumps({
            "current_value": current_value,
            "historical_values": historical_values
        }))

if __name__ == "__main__":
    scrape()