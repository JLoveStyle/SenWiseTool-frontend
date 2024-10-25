import { AnalysisProps, InspectionDataType, ProjectsType } from "@/types/api-types";
import React, { useEffect, useState } from "react";
import DisplayInspectionAnalysis from "../displayInspectionAnalysis";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

type Props = {
  projectType: ProjectsType;
};

export default function InspectionData({ projectType }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inspectionDatas, setIspectionDatas] = useState<InspectionDataType>()

  // fetch all projects with answers by type. this will come from project_audit table
  async function fetchAllInpectionData(type: ProjectsType) {
    setIsLoading((prev) => !prev);
  }

  useEffect(() => {
    // fetchAllInpectionData(projectType);
  }, []);

  const jsonObj = [
    {
      nom_planteur: "Jean",
      code_planteur: "40c2",
      nom_inspecteur: "Luc",
      village: "Awae",
      date_inspection: "30/01/2023",
      data: [
        {
          num: "1.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "6.3.1",
          NC: true,
          NA: false,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "5.4.1",
          NC: false,
          NA: false,
          C: true,
          comment: "dsdvbdvbsd",
        },
        {
          num: "2.1.1",
          NC: true,
          NA: false,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "3.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "4.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "4.3.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "4.1.2",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
      ],
    },
    {
      nom_planteur: "Blaise",
      code_planteur: "40c2",
      nom_inspecteur: "Louis",
      village: "Mbouda",
      date_inspection: "30/01/2023",
      data: [
        {
          num: "1.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "1.2.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "6.3.1",
          NC: true,
          NA: false,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "6.3.5",
          NC: true,
          NA: false,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "5.4.1",
          NC: false,
          NA: false,
          C: true,
          comment: "dsdvbdvbsd",
        },
        {
          num: "2.1.1",
          NC: true,
          NA: false,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "3.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "4.1.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
        {
          num: "4.2.1",
          NC: false,
          NA: true,
          C: false,
          comment: "dsdvbdvbsd",
        },
      ],
    },
  ];

  const analysis: AnalysisProps[] = [];

  let result: InspectionDataType = {
    total_A: jsonObj[0].data.length,
    chapter1: {
      C: 0,
      NC: 0,
      NA: 0,
    },
    chapter2: {
      C: 0,
      NC: 0,
      NA: 0,
    },
    chapter3: {
      C: 0,
      NC: 0,
      NA: 0,
    },
    chapter4: {
      C: 0,
      NC: 0,
      NA: 0,
    },
    chapter5: {
      C: 0,
      NC: 0,
      NA: 0,
    },
    chapter6: {
      C: 0,
      NC: 0,
      NA: 0,
    },
  };

  const handleAnalysis = (
    datas: {
      num: string;
      NC: boolean;
      NA: boolean;
      C: boolean;
      comment: string;
    }[]
  ) => {
    console.log(datas);

    for (const data of datas) {
      if (data.num.slice(0, 1) === "1") {
        if (data.C) result['chapter1'].C ++
        else if (data.NC) result['chapter1'].NC ++
        else if (data.NA) result['chapter1'].NA ++ 
      }
      if (data.num.slice(0, 1) === "2") {
        if (data.C) result['chapter2'].C ++
        else if (data.NC) result['chapter2'].NC ++
        else if (data.NA) result['chapter2'].NA ++ 
      }
      if (data.num.slice(0, 1) === "3") {
        if (data.C) result['chapter3'].C ++
        else if (data.NC) result['chapter3'].NC ++
        else if (data.NA) result['chapter3'].NA ++ 
      }
      if (data.num.slice(0, 1) === "4") {
        if (data.C) result['chapter4'].C ++
        else if (data.NC) result['chapter4'].NC ++
        else if (data.NA) result['chapter4'].NA ++ 
      }
      if (data.num.slice(0, 1) === "5") {
        if (data.C) result['chapter5'].C ++
        else if (data.NC) result['chapter5'].NC ++
        else if (data.NA) result['chapter5'].NA ++ 
      }
      if (data.num.slice(0, 1) === "6") {
        if (data.C) result['chapter6'].C ++
        else if (data.NC) result['chapter6'].NC ++
        else if (data.NA) result['chapter6'].NA ++ 
      }
    }
    setIspectionDatas(result)
    LOCAL_STORAGE.save('insection-data', result)
    result = {
      total_A: jsonObj[0].data.length,
      chapter1: {
        C: 0,
        NC: 0,
        NA: 0,
      },
      chapter2: {
        C: 0,
        NC: 0,
        NA: 0,
      },
      chapter3: {
        C: 0,
        NC: 0,
        NA: 0,
      },
      chapter4: {
        C: 0,
        NC: 0,
        NA: 0,
      },
      chapter5: {
        C: 0,
        NC: 0,
        NA: 0,
      },
      chapter6: {
        C: 0,
        NC: 0,
        NA: 0,
      },
    };
    console.log('res', result)
  };
  console.log("inspec", inspectionDatas);

  return (
    <div className="bg-[#f3f4f6]  md:w-full">
      <h2 className="text-center py-4 font-semibold">Project title: </h2>
      <div className="flex">
        <div className="md:w-[60%] px-6 ">
          <table>
            <thead>
              <tr>
                <th className="p-2  border">N°</th>
                <th className="p-2  border">Nom du planteur</th>
                <th className="p-2  border">Code du planteur</th>
                <th className="p-2  border">Village</th>
                <th className="p-2  border">Nom de l'inspecteur</th>
                <th className="p-2  border">Date de l'inspection</th>
                {/* <th className="p-2  border">Observation</th> */}
              </tr>
            </thead>
            <tbody>
              {jsonObj.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleAnalysis(item.data)}
                  className="hover:cursor-pointer py-3 "
                >
                  <td className="p-2  border ">{idx + 1}</td>
                  <td className="p-2  border hover:underline ">
                    {item.nom_planteur}{" "}
                  </td>
                  <td className="p-2  border ">{item.code_planteur} </td>
                  <td className="p-2  border ">{item.village}</td>
                  <td className="p-2  border ">{item.nom_inspecteur} </td>
                  <td className="p-2  border ">{item.date_inspection} </td>
                  {/* <td className="p-2  border ">{item.} </td> */}
                </tr>
              ))}
              <tr className="hover:cursor-pointer py-3 ">
                <td className="p-2  border ">1</td>
                <td className="p-2  border ">
                  <input
                    className="p-1"
                    type="text"
                    value={"Mikam Jeanne marie"}
                  />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"4100"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"Mikel"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"Parfait Ayos"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"30/10/2023"} />
                </td>
              </tr>
              <tr className="hover:cursor-pointer py-3 ">
                <td className="p-2  border ">2</td>
                <td className="p-2  border ">
                  <input
                    className="p-1"
                    type="text"
                    value={"Jean Marie Mvondo"}
                  />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"4b3x"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"Mikel"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"Parfait Ayos"} />
                </td>
                <td className="p-2  border ">
                  <input className="p-1" type="text" value={"30/10/2023"} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* <div className="bg-white md:w-[40%] p-6 ">
          <DisplayInspectionAnalysis inspectionData={inspectionDatas}/>
        </div> */}
      </div>
    </div>
  );
}
