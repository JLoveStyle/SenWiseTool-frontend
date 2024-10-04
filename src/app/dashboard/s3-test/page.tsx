"use client";

import {
  CreateBucket,
  DisplayFile,
  UploadFile,
} from "@/components/organisms/dev-test/s3";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";

const UploadComponent = () => {
  return (
    <LayoutDashboardTemplate>
      <div className="flex gap-5">
        <div className="m-24 flex flex-col items-center gap-16">
          <CreateBucket />

          <hr />

          <UploadFile />
        </div>
        <div>
          <DisplayFile url="https://swt-bucket-test.s3.eu-west-1.amazonaws.com/uploads/1727788458845-dfed13d2-b24c-474e-88e2-cee7e4d3b6a2-Post-Instagram-Cours-de-cuisine-Chandeleur-crepes-live-moderne-bleu-(2).png" />
        </div>
      </div>
    </LayoutDashboardTemplate>
  );
};

export default UploadComponent;
