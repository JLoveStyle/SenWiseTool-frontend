import { clientS3 } from "@/config/s3";
import { PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const bucketName = (await request.formData()).get("bucketName") as string;

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

    const params = {
      Bucket: bucketName,
      Policy: JSON.stringify(bucketPolicy),
    };

    const command = new PutBucketPolicyCommand(params);
    await clientS3.send(command);

    return NextResponse.json(
      { message: "Bucket configuré avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during disabled update bucket policy:", error);
    return NextResponse.json(
      {
        message: "Erreur lors de la configuration du bucket",
        error,
      },
      { status: 500 }
    );
  }
}
