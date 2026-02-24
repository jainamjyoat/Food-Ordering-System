import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Binary } from 'mongodb';

// Ensure this route runs on the Node.js runtime (required for Buffer usage)
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

export async function POST(request: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = (file as any).name || 'upload.bin';
    let contentType = (file as any).type || 'application/octet-stream';
    // Fallback to infer content type from filename extension if missing
    if (contentType === 'application/octet-stream' && typeof fileName === 'string') {
      const lower = fileName.toLowerCase();
      if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (lower.endsWith('.png')) contentType = 'image/png';
      else if (lower.endsWith('.gif')) contentType = 'image/gif';
      else if (lower.endsWith('.webp')) contentType = 'image/webp';
      else if (lower.endsWith('.svg')) contentType = 'image/svg+xml';
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { client, db } = await getDb();
    try {
      const images = db.collection(IMAGES_COLLECTION);
      const doc = {
        data: new Binary(buffer),
        contentType,
        filename: fileName,
        createdAt: new Date(),
      };
      const result = await images.insertOne(doc as any);

      const id = result.insertedId.toString();
      const url = `/api/images/${id}`;

      // Return a URL that can be used to fetch the image
      return NextResponse.json({ url, id }, { status: 201 });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
