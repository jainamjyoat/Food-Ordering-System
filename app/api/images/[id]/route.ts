import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export const runtime = 'nodejs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const DB_NAME = 'food_ordering_system';
const IMAGES_COLLECTION = 'images';

async function getDb() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  return { client, db };
}

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  try {
    const maybeParams: any = (context as any).params;
    const resolvedParams = typeof maybeParams?.then === 'function' ? await maybeParams : maybeParams;
    const id: string | undefined = resolvedParams?.id;
    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return new NextResponse('Invalid id', { status: 400 });
    }
    const { client, db } = await getDb();
    try {
      const images = db.collection(IMAGES_COLLECTION);
      const doc: any = await images.findOne({ _id: new ObjectId(id) });
      if (!doc || !doc.data) {
        return new NextResponse('Not found', { status: 404 });
      }
      const headers = new Headers();
      // Safely construct the Buffer from MongoDB Binary and ensure correct length
      const bin: any = doc.data; // BSON Binary
      let out: Buffer;
      if (Buffer.isBuffer(bin)) {
        out = bin as Buffer;
      } else if (bin?.buffer) {
        const rawBuf: Buffer = Buffer.from(bin.buffer);
        const len = typeof bin.length === 'function' ? bin.length() : (typeof bin.length === 'number' ? bin.length : rawBuf.byteLength);
        out = rawBuf.subarray(0, len);
      } else if (typeof bin?.base64 === 'string') {
        out = Buffer.from(bin.base64, 'base64');
      } else {
        // As a last resort, attempt to coerce to Buffer
        out = Buffer.from(bin as any);
      }

      // Determine content-type: prefer stored, otherwise sniff
      let ctype: string | undefined = doc.contentType;
      if (!ctype || ctype === 'application/octet-stream') {
        // JPEG
        if (out.length >= 3 && out[0] === 0xFF && out[1] === 0xD8 && out[2] === 0xFF) {
          ctype = 'image/jpeg';
        } else if (out.length >= 8 && out[0] === 0x89 && out[1] === 0x50 && out[2] === 0x4E && out[3] === 0x47 && out[4] === 0x0D && out[5] === 0x0A && out[6] === 0x1A && out[7] === 0x0A) {
          // PNG
          ctype = 'image/png';
        } else if (out.length >= 6 && out.toString('ascii', 0, 6) === 'GIF87a' || out.toString('ascii', 0, 6) === 'GIF89a') {
          // GIF
          ctype = 'image/gif';
        } else if (out.length >= 12 && out.toString('ascii', 0, 4) === 'RIFF' && out.toString('ascii', 8, 12) === 'WEBP') {
          // WEBP
          ctype = 'image/webp';
        } else {
          ctype = 'application/octet-stream';
        }
      }

      headers.set('Content-Type', ctype);
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      // Suggest a filename via Content-Disposition (inline so <img> renders)
      const ext = ctype.includes('jpeg') ? 'jpg' : (ctype.split('/')[1] || 'bin');
      const name = typeof doc.filename === 'string' ? doc.filename : `image.${ext}`;
      headers.set('Content-Disposition', `inline; filename="${name}"`);
      headers.set('Content-Length', String(out.byteLength));
      return new NextResponse(out, { status: 200, headers });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Fetch image error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
