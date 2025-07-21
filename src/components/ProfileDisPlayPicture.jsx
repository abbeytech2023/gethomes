import React from "react";

export default function ProfileDisPlayPicture() {
  return (
    <div className="mt-32 mb-7  tracking-wide gap-7 flex flex-col items-center ">
      <h2 className="font-medium text-3xl md:text-2xl tracking-wider">
        Account Profile
      </h2>
      <div className="flex justify-center items-center text-amber-50 w-[10rem] h-[9rem] bg-blue-700">
        OA
      </div>
      <p className="font-[500] text-[1.38rem]  md:text-[1.1rem]">
        Olanipekun Abbey
      </p>
      <p className="md:pl-6.5 text-[1.2rem]">olanipekunabbey@gmail.com</p>
    </div>
  );
}
