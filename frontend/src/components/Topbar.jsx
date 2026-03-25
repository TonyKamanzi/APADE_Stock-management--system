import React from "react";
import { Settings, User } from "lucide-react";
export default function Topbar() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/apade.png" alt="apade logo" className="w-20 h-20" />
        </div>
        <div flex className="flex items-center ">
          <div className="bg-blue-600 p-3 mr-4 rounded-full"> 
            <User className="text-white " />
          </div>
        </div>
      </div>
    </div>
  );
}
