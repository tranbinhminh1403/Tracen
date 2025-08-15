import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || 'https://gametora.com/umamusume';

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // Set User-Agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    );

    // Navigate and wait for the specific selector
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.umamusume_banner_section__U1zJj', {
      timeout: 10000,
    });

    const content = await page.evaluate(() => {
      const element = document.querySelector('.umamusume_banner_section__U1zJj');
      return element ? element.innerHTML : null;
    });

    await browser.close();

    if (!content) {
      return NextResponse.json(
        { error: 'Element with class="umamusume_banner_section__U1zJj" not found' },
        { status: 404 }
      );
    }

    // Use Cheerio to modify img src attributes
    const $ = cheerio.load(content);
    $('img').each((_, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('/')) {
        $(img).attr('src', `https://gametora.com${src}`);
      }
    });

    const modifiedContent = $.html();

    return NextResponse.json({ content: modifiedContent });
  } catch (error) {
    console.error('Error in getUmaBanner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse content' },
      { status: 500 }
    );
  }
}