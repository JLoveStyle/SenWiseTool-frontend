import React from "react";

type Props = {};

export default function AddFormFromLibrary({}: Props) {
  return (
    <div className="py-8 px-3">
      <h1 className="uppercase font-bold">From style</h1>
      <p className="">choose the form style that will suit your project.</p>
      <select className="border flex flex-col mt-1 mb-7 p-1 w-[95%] md:w-full bg-transparent outline-none focus:border-primary shadow-sm rounded-md">
        <option selected disabled>
          Default-simple page
        </option>
        <option>Thème de grill</option>
        <option>Page multiple</option>
      </select>
      <h1 className="font-semibold uppercase pb-2">Metadata</h1>
      <div className="flex gap-2 justify-between leading-loose">
        <div className="">
          <div className="flex gap-3">
            <input type="checkbox" name="start_time" id="start_time" />
            <label htmlFor="" id="start_time">
              Start time
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="end_time" id="end_time" />
            <label htmlFor="" id="end_time">
              End time
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="today" id="today" />
            <label htmlFor="" id="today">
              Today
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="audit" id="audit" />
            <label htmlFor="" id="audit">
              Audit
            </label>
          </div>
        </div>
        <div className="">
          <div className="flex gap-3">
            <input type="checkbox" name="username" id="username" />
            <label htmlFor="" id="username">
              username
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="phone_number" id="phone_number" />
            <label htmlFor="" id="phone_number">
              Phone number
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="device_id" id="device_id" />
            <label htmlFor="" id="device_id">
              Device id
            </label>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" name="startç_geopoint" id="startç_geopoint" />
            <label htmlFor="" id="startç_geopoint">
              Start geopoints early
            </label>
          </div>
        </div>
      </div>
      <h1 className="font-semibold py-4">Back-end Audio</h1>
    </div>
  );
}
