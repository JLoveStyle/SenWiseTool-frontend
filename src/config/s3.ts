import {
  PutBucketAclCommand,
  PutBucketPolicyCommand,
  PutPublicAccessBlockCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// Initialiser le client S3
export const clientS3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

// Fonction pour désactiver l'accès public
export const disablePublicAccess = async (bucketName: string) => {
  try {
    const params = {
      Bucket: bucketName,
      ACL: "private" as const, // Désactiver l'accès public en définissant ACL à "private"
    };

    const command = new PutBucketAclCommand(params);
    await clientS3.send(command);
    console.log("Public access disabled successfully");
  } catch (error) {
    console.error("Error disabling public access:", error);
    throw error;
  }
};

// Fonction pour désactiver le blocage de l'accès public
export const disablePublicAccessBlock = async (bucketName: string) => {
  try {
    const params = {
      Bucket: bucketName,
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false, // Ne pas bloquer les ACL publiques
        IgnorePublicAcls: false, // Ne pas ignorer les ACL publiques
        BlockPublicPolicy: false, // Ne pas bloquer les politiques publiques
        RestrictPublicBuckets: false, // Ne pas restreindre les buckets publics
      },
    };

    const command = new PutPublicAccessBlockCommand(params);
    await clientS3.send(command);
    return { data: true };
  } catch (error) {
    return { error: error };
  }
};

// Fonction pour mettre à jour la politique du bucket
export const updateBucketPolicy = async (bucketName: string) => {
  const bucketPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${bucketName}/*`,
      },
    ],
  };

  try {
    const params = {
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy),
    };

    const command = new PutBucketPolicyCommand(params);
    await clientS3.send(command);
    return { data: true };
  } catch (error) {
    return { error: error };
  }
};

// Générer une URL signée pour accéder à un fichier
export const getSignedFileUrl = async (
  bucketName: string,
  key: string,
  delay: number
) => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // URL signée avec expiration de 1 heure (vous pouvez ajuster cela)
    const signedUrl = await getSignedUrl(clientS3, command, {
      expiresIn: delay,
    });
    return signedUrl;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
};
