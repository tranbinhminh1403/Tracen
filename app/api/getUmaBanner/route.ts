import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

interface CacheData {
  timestamp: string; // ISO string for the date of the last fetch
  content: string; // HTML content
}

// Path to cache file (use /tmp for Vercel serverless)
const CACHE_FILE = path.join('./tmp', 'cache.json');

// Helper function to check if the cache is from today
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

    // Try to read from cache
    try {
      const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8');
      const cacheData: CacheData = JSON.parse(cacheContent);

      // Check if cache is from today
      if (cacheData.content && isCacheValid(cacheData.timestamp)) {
        return NextResponse.json({ content: cacheData.content });
      }
    } catch (error) {
      console.log('No valid cache found or cache error:', error);
      // Proceed to fetch if cache is missing or invalid
    }

    // Fetch content with Puppeteer
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

    // Modify img src attributes with Cheerio
    const $ = cheerio.load(content);
    $('img').each((_, img) => {
      const src = $(img).attr('src');
      if (src && src.startsWith('/')) {
        $(img).attr('src', `https://gametora.com${src}`);
      }
    });

    const modifiedContent = $.html();

    // Save to cache
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