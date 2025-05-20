import React from "react";
import { PinContainer } from "../components/ui/3d-pin";

export default function UserCard({ info }) {
  console.log(info);
  return (
    <div
      className="min-h-[30rem] w-full flex items-center justify-center"
      key={info?.index}
    >
      <PinContainer title="Team Member" href="https://twitter.com/xxehacker0x1">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] lg:w-[30rem] lg:h-[30rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            {info?.user?.name}
          </h3>
          <p className="text-white">{info?.user?.role}</p>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">{info?.user?.bio}</span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer>
    </div>
  );
}
