const updateBucketPolicy = async ({ bucketName }: { bucketName?: string }) => {
  if (!bucketName) {
    return {
      error: {
        message: "Bucket name is required",
        status: 400,
        error: null,
      },
    };
  }

  const formData = new FormData();
  formData.append("bucketName", bucketName);

  try {
    const res = await fetch("/api/s3/update-bucket-policy", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Failed to update bucket policy", data);
      throw new Error("Failed to update bucket policy");
    }
    console.log("update bucket policy response", data);

    return { data: data };
  } catch (error) {
    return {
      error: {
        message:
          "update bucket policy Error: Failed to update bucket policy of the ${bucketName} bucket on s3 service.",
        status: 500,
        error: error,
      },
    };
  }
};

const disablePublicAccessBlock = async ({
  bucketName,
}: {
  bucketName?: string;
}) => {
  if (!bucketName) {
    return {
      error: {
        message: "Bucket name is required",
        status: 400,
        error: null,
      },
    };
  }

  const formData = new FormData();
  formData.append("bucketName", bucketName);

  try {
    const res = await fetch("/api/s3/disable-public-access-block", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Failed to disabled Public access block", data);
      throw new Error("Failed to disabled Public access block");
    }
    console.log("Public access block disabled response", data);

    return { data: data };
  } catch (error) {
    return {
      error: {
        message:
          "disable public access block Error: Failed to disable public access block of the ${bucketName} bucket on s3 service.",
        status: 500,
        error: error,
      },
    };
  }
};

export const CreateBucketToS3 = async ({
  bucketName,
}: {
  bucketName?: string;
}) => {
  if (!bucketName) {
    return {
      error: {
        message: "Bucket name is required",
        status: 400,
        error: null,
      },
    };
  }

  const formData = new FormData();
  formData.append("bucketName", bucketName);

  const handleUpdateBucketPolicy = async ({
    bucketName,
  }: {
    bucketName?: string;
  }) => {
    try {
      const { data, error } = await updateBucketPolicy({ bucketName });

      if (error) {
        console.log("Failed to Updated bucket policy", error);
        throw new Error("Failed to Updated bucket policy");
      }

      console.log("Bucket policy updated response", data);

      console.table([
        { Action: "create bucket", Status: "Successfull..." },
        { Action: "Disabling public access block", Status: "Successfull..." },
        { Action: "Updated policy", Status: "Successfull..." },
      ]);

      return { data: true };
    } catch (error) {
      return {
        error: {
          message:
            "Updating bucket policy Error: Failed to updating bucket policy of the ${bucketName} bucket on s3 service.",
          status: 500,
          error: error,
        },
      };
    }
  };

  const handleDisablePublicAccessBlock = async ({
    bucketName,
  }: {
    bucketName?: string;
  }) => {
    try {
      const { data, error } = await disablePublicAccessBlock({ bucketName });

      if (error) {
        console.log("Failed to disabled Public access block", error);
        throw new Error("Failed to disabled Public access block");
      }

      console.log("Public access block disabled response", data);

      const responseData = await handleUpdateBucketPolicy({ bucketName });

      if (responseData.error) {
        console.log("Error during the bucket creation", responseData.error);
        throw new Error("Error during the bucket creation");
      }

      return { data: responseData.data };
    } catch (error) {
      return {
        error: {
          message:
            "Public access block disabled Error: Failed to Public access block disabled of the ${bucketName} bucket on s3 service.",
          status: 500,
          error: error,
        },
      };
    }
  };

  try {
    const res = await fetch("/api/s3/create-bucket", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      console.log("Failed to create bucket", data);
      throw new Error("Failed to create bucket");
    }

    console.log("Create bucket response", data);

    const responseData = await handleDisablePublicAccessBlock({ bucketName });

    if (responseData.error) {
      console.log("Error during the bucket creation", responseData.error);
      throw new Error("Error during the bucket creation");
    }

    return { data: responseData.data };
  } catch (error) {
    return {
      error: {
        message: `Create bucket Error: Failed to create a bucket ${bucketName} on s3 service.`,
        status: 500,
        error: error,
      },
    };
  }
};

export const UpdateFilesToS3 = async ({
  files,
  bucketName,
  directory,
}: {
  files: File[];
  bucketName?: string;
  directory?: string;
}) => {
  if (files.length === 0) {
    return {
      error: {
        message: "File is required",
        status: 400,
        error: null,
      },
    };
  }

  const formData = new FormData();

  if (bucketName) {
    formData.append("bucketName", bucketName);
  }

  if (directory) {
    formData.append("directory", directory);
  }

  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });

  try {
    const res = await fetch("/api/s3/upload-file", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload files");
    }

    const data = await res.json();
    return { data: data };
  } catch (error) {
    return {
      error: {
        message: "Upload Error: Failed to upload one or more files.",
        status: 500,
        error: error,
      },
    };
  }
};
