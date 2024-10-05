import { clientS3 } from "@/config/s3";
import { PutPublicAccessBlockCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bucketName = (await request.formData()).get("bucketName") as string;

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

    return NextResponse.json(
      { message: "Blocage d'accès public désactivé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during disabled public access block:", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la désactivation du blocage d'accès public",
        error,
      },
      { status: 500 }
    );
  }
}
