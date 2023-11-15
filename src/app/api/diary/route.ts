import { join } from "path";
import { writeFile } from "fs/promises"; 
import { NextRequest, NextResponse } from "next/server";
import { randomStrings } from "@/app/hooks/hooks";

export const api = {
    bodyParse: false
};

export async function POST( req: NextRequest, res: NextResponse ) {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;
    const title: string = data.get('title') as unknown as string;
    console.log(title);
    if(!file) {
        return NextResponse.json({result: 'error'});
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.type.split('/')[1];
    const saveName = Date.now() + "_" + randomStrings() + `.${ext}`
    const path = join('./public','imgs', saveName);
    await writeFile(path, buffer)
    return NextResponse.json({result:'done'})
};