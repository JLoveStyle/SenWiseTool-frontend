import { clientS3 } from "@/config/s3";
import {
  BucketLocationConstraint,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";

export const createBucket = async (bucketName: string) => {
  try {
    // Vérifiez si la région est définie correctement
    const region = process.env.NEXT_PUBLIC_AWS_REGION;

    // Si la région est différente de "us-east-1", alors inclure la configuration de location
    const params =
      region && region !== "us-east-1"
        ? {
            Bucket: bucketName,
            CreateBucketConfiguration: {
              LocationConstraint: region as BucketLocationConstraint, // Ici, on force le typage
            },
          }
        : { Bucket: bucketName };

    const command = new CreateBucketCommand(params);
    const response = await clientS3.send(command);

    return { data: response };
  } catch (error) {
    console.error("Erreur lors de la création du bucket:", error);
    return { error: error };
  }
};
