// app/api/top-stories/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export async function GET() {
    try {
        const result = await redis.zrange('stories', 0, 9, { rev: true });
        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to fetch stories:', error);
        return NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 });
    }
}