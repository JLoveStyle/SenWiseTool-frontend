import { clientS3 } from "@/config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const bucketName = formData.get("bucketName") as string;
    const directory = formData.get("directory") as string;
    const files: File[] = [];

    if (!formData.get("files[0]")) {
      return NextResponse.json(
        { message: "Fichier manquant" },
        { status: 400 }
      );
    }

    let i = 0;
    while (formData.get(`files[${i}]`)) {
      files.push(formData.get(`files[${i}]`) as File);
      i++;
    }
    console.log("directory....", directory);

    const bucket_name = bucketName
      ? bucketName
      : process.env.NEXT_PUBLIC_BUCKET_NAME;

    const dir = directory ? `${directory}/` : "";

    const URLs: string[] = [];

    const uploadPromises = files.map(async (file) => {
      const key = `${slugify(dir)}${Date.now()}-${uuidv4()}-${slugify(
        file.name
      )}`;

      const buffer = await file.arrayBuffer(); // Convertir le fichier en ArrayBuffer
      const fileBuffer = Buffer.from(buffer); // Créer un buffer compatible avec Node.js

      const params = {
        Bucket: bucket_name,
        Key: key,
        Body: fileBuffer, // Buffer du fichier
        ContentType: file.type, // Type MIME du fichier
        // ACL: "public-read" as ObjectCannedACL, // Rendre le fichier publiquement accessible via une URL
      };

      const command = new PutObjectCommand(params);
      await clientS3.send(command);

      // Générer l'URL publique permanente
      return `https://${bucket_name}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    });

    const uploadedURLs = await Promise.all(uploadPromises);
    URLs.push(...uploadedURLs);
    console.log("URLs Files Uploaded: ", URLs);

    return NextResponse.json(
      { message: "s3 RESPONSE", URLs: URLs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during file upload:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
