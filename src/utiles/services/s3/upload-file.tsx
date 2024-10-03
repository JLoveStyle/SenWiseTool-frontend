import { clientS3 } from "@/config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async (
  file: File,
  directory?: string,
  bucketName?: string
) => {
  try {
    const bucket_name = bucketName ?? process.env.NEXT_PUBLIC_BUCKET_NAME;
    const dir = directory ? `${directory}/` : "";
    const key = `${dir}${Date.now()}-${uuidv4()}-${slugify(file.name)}`;

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
    const publicUrl = `https://${bucket_name}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
    return { url: publicUrl };
  } catch (error) {
    return { error: error };
  }
};
