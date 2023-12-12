'use client';

import { useEffect, useState } from "react";

export default function Carausel({ images }) {
  const [num, setNum] = useState(0);

  useEffect(() => {
    async function loop() {
      for (let i in images) {
        i = Number(i);
        setNum(i);
        await new Promise((r) => setTimeout(r, 4000));
      }
      for (let i in images) {
        i = ((images.length - 1) - Number(i));
        setNum(i);
        await new Promise((r) => setTimeout(r, 4000));
      }
      loop();
    }
    loop();
  }, []);

  return (
    <>
      <div className="flex flex-row mx-auto -z-50 translate-x-[50%]">
        {images.map((v, i) => {
          if (i != num) {
            return <img key={i} src={v} alt="" className={`max-w-sm lg:max-w-lg xl:max-w-xl object-contain py-4 px-14 duration-700 rounded-lg overflow-clip`} style={{ transform: `translateX(-${(num * 100) + 50}%)` }} />;
          }
          return (
            <img key={i} src={v} alt="" className={`max-w-sm lg:max-w-lg xl:max-w-xl object-contain duration-1000 rounded-lg`} style={{ transform: `translateX(-${(num * 100) + 50}%)`, borderRadius: `10px` }} />
          );
        })}
      </div>
    </>
  );
}
