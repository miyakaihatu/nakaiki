const fs = require('node:fs/promises');
const path = require('node:path');

const NOTE_USER = process.env.NOTE_USER || 'miyaaromassage';
const RSS_URL = process.env.NOTE_RSS_URL || `https://note.com/${NOTE_USER}/rss`;
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'note.json');

function decodeEntities(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(value = '') {
  return decodeEntities(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tagValue(item, tag) {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeEntities(match[1]).trim() : '';
}

function imageValue(item, description) {
  const media = item.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i);
  if (media) return decodeEntities(media[1]).trim();

  const enclosure = item.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i);
  if (enclosure) return decodeEntities(enclosure[1]).trim();

  const image = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  return image ? decodeEntities(image[1]).trim() : '';
}

function parseItems(xml) {
  return [...xml.matchAll(/<item[\s\S]*?<\/item>/gi)].slice(0, 5).map((match) => {
    const item = match[0];
    const rawDescription = tagValue(item, 'description');
    const pubDate = tagValue(item, 'pubDate');

    return {
      title: stripHtml(tagValue(item, 'title')),
      link: tagValue(item, 'link'),
      pubDate: pubDate ? new Date(pubDate).toISOString() : '',
      description: stripHtml(rawDescription).slice(0, 160),
      image: imageValue(item, rawDescription)
    };
  }).filter((entry) => entry.title && entry.link);
}

async function main() {
  const response = await fetch(RSS_URL, {
    headers: { 'user-agent': 'nakaiki-note-rss-updater/1.0' }
  });

  if (!response.ok) {
    throw new Error(`RSS fetch failed: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const items = parseItems(xml);

  if (!items.length) {
    throw new Error('RSS did not contain any items');
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(items, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${items.length} note items to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
