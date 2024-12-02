import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import {getTopStories} from "../../actions";

const redis = Redis.fromEnv();

export async function GET() {
    try {
        // Fetch stories from Redis
        let { data } = await getTopStories();
        data = data.filter(
            (story) => story.summaryAudio && story.summaryAudio.length > 0
        );
        // Build the RSS feed
        const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Radio Hackernews</title>
    <description>Recap of the top hackernews stories of the day</description>
    <link>https://radio-hackernews-web.vercel.app/</link>
    <language>en-us</language>
    <copyright>Copyright ${new Date().getFullYear()}</copyright>
    
    <atom:link href="https://radio-hackernews-web.vercel.app/api/podcast" rel="self" type="application/rss+xml"/>
    
    <itunes:author>Enes Akar</itunes:author>
    <itunes:summary>Recap of the top hackernews stories of the day</itunes:summary>
    <itunes:owner>
      <itunes:name>Enes Akar</itunes:name>
      <itunes:email>your.email@example.com</itunes:email>
    </itunes:owner>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Technology"/>
    <itunes:image href="https://radio-hackernews-web.vercel.app/images/podcast.jpeg"/>
    
    ${data
            .map(
                (story) => `
    <item>
      <title>${escapeXml(story.title)}</title>
      <description>${escapeXml(story.title)}</description>
      <itunes:summary>${escapeXml(story.title)}</itunes:summary>
      <enclosure 
        url="${escapeXml(story.summaryAudio)}"
        length="0"
        type="audio/mpeg"
      />
      <guid isPermaLink="false">${story.id}</guid>
      <pubDate>${new Date(story.readableTime).toUTCString()}</pubDate>
      <link>${escapeXml(story.url)}</link>
      <itunes:duration>${Math.round(story.summaryAudioDuration)}</itunes:duration>
    </item>`
            )
            .join("\n")}
  </channel>
</rss>`;

        // Return the feed with proper content type
        return new NextResponse(feed, {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "s-maxage=3600, stale-while-revalidate",
            },
        });
    } catch (error) {
        console.error("Error generating podcast feed:", error);
        return NextResponse.json(
            { error: "Failed to generate podcast feed" },
            { status: 500 }
        );
    }
}

// Helper function to escape XML special characters
function escapeXml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
