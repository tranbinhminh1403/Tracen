import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

interface CacheData {
  timestamp: string;
  content: string;
}

const CACHE_FILE = path.join('./tmp', 'cache.json');

function isCacheValid(timestamp: string): boolean {
  const cacheDate = new Date(timestamp);
  const today = new Date();
  return (
    cacheDate.getUTCFullYear() === today.getUTCFullYear() &&
    cacheDate.getUTCMonth() === today.getUTCMonth() &&
    cacheDate.getUTCDate() === today.getUTCDate()
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || 'https://gametora.com/umamusume';

    try {
      const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8');
      const cacheData: CacheData = JSON.parse(cacheContent);
      if (cacheData.content && isCacheValid(cacheData.timestamp)) {
        return NextResponse.json({ content: cacheData.content });
      }
    } catch (error) {
      console.log('No valid cache found or cache error:', error);
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    );

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

    const data = cheerio.load(content);
    data('img').each((_, img) => {
      const src = data(img).attr('src');
      if (src && src.startsWith('/')) {
        data(img).attr('src', `https://gametora.com${src}`);
      }
    });

    const modifiedContent = data.html();

    const cacheData: CacheData = {
      timestamp: new Date().toISOString(),
      content: modifiedContent,
    };
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2), 'utf-8');

    return NextResponse.json({ content: modifiedContent });
  } catch (error) {
    console.error('Error in getUmaBanner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse content' },
      { status: 500 }
    );
  }
}