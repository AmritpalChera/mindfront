import { ReactElement } from "react";

interface TheirContainer {
  children: React.ReactNode;
  imageUrl: string;
}

const TheirMessageContainer = ({ children, imageUrl }: TheirContainer) => {
  return (
    <div className="flex flex-row justify-start relative mt-2 ">
      <div className="flex items-end justify-center">
        <div className=" relative flex mr-1 w-8 h-8">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                  src={imageUrl}
                  alt=""
                  
            />  
        </div>
      </div>
      
        <div className="messages text-sm text-white grid grid-flow-row">
          {children}
        </div>
    </div>
 )
};

export default TheirMessageContainer;