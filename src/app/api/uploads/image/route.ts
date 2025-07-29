// In: src/app/api/uploads/image/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('image') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    // Convert the file data to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename to prevent overwriting
    const filename = `${Date.now()}-${file.name}`;
    
    // Define the path where the file will be saved
    // This saves it inside the `public` folder of your Next.js project
    const savePath = path.join(process.cwd(), 'public/uploads', filename);

    // Write the file to the filesystem
    await writeFile(savePath, buffer);
    console.log(`File saved to ${savePath}`);

    // Return the URL that the front-end can use
    const fileUrl = `/uploads/${filename}`; // This is a public URL

    return NextResponse.json({ success: true, url: fileUrl });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}