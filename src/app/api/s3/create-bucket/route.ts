import { clientS3 } from "@/config/s3";
import {
  BucketLocationConstraint,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: NextRequest) {
  try {
    const bucketName = (await request.formData()).get("bucketName") as string;

    if (!bucketName) {
      return NextResponse.json(
        { message: "Bucket name is required" },
        { status: 400 }
      );
    }

    const region = process.env.NEXT_PUBLIC_AWS_REGION;

    // Si la région est différente de "us-east-1", alors inclure la configuration de location
    const params =
      region && region !== "us-east-1"
        ? {
            Bucket: slugify(bucketName),
            CreateBucketConfiguration: {
              LocationConstraint: region as BucketLocationConstraint, // Ici, on force le typage
            },
          }
        : { Bucket: slugify(bucketName) };

    const command = new CreateBucketCommand(params);
    const response = await clientS3.send(command);

    return NextResponse.json(
      { message: "Bucket créé avec succès", response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Erreur lors de la création du bucket", error);

    return NextResponse.json(
      { message: "Erreur lors de la création du bucket", error },
      { status: 500 }
    );
  }
}
