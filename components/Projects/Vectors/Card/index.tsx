import Image from "next/image";
import VectorsMenu from "../Menu";
import Chatbot from "../Chatbot";

type metadataType = {
  id: string,
  metadata: any,
  score?: number
}

interface VectorCardInterface {
  vector: metadataType,
  index: number,
  handleActionClick: (action: string, index: number) => void,
  activeChatIndex: number,
  setActiveChatIndex: (n: number) => void,
  search?: string,
  filtersApplied: boolean
}

const VectorCard = ({vector, index, handleActionClick, activeChatIndex, setActiveChatIndex, search, filtersApplied}: VectorCardInterface) => {
  const metadataKeys = Object.keys(vector.metadata);

  return (
    <div className="shadow relative border-gray-300 border dark:bg-secondary rounded-md pb-6  mt-4  w-full px-4 py-4">
      <div  className="w-full justify-between flex">
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-bold md:text-xl text-sm text-primary max-w-[200px] md:max-w-[400px] text-ellipsis overflow-clip whitespace-pre">Vector {index+1}</p>
        </div>
        <VectorsMenu handleActionClick={handleActionClick} index={index} />
      </div>
      
      <div className="flex my-1 flex-col">
        {vector.score && <div className="text-sm md:text-md mb-4 text-gray w-full text-ellipsis whitespace-pre overflow-clip md:overflow-auto">
            <div className="flex gap-4 text-primary font-medium">
              <div className="w-20 ">Match Score: </div>
              <div className="whitespace-pre-wrap md:pr-12">{((vector.score)*100).toFixed(2)}%</div>
            </div>
          </div>}
        {
          metadataKeys.map((keyData, index) => {
            return (
              <div key={keyData} className="text-sm md:text-md text-gray w-full mt-4 text-ellipsis whitespace-pre overflow-clip md:overflow-auto">
                <div className="flex gap-6">
                  <div className="font-medium w-20">{keyData}: </div>
                  <div className="text-gray-500 dark:text-gray-300 whitespace-pre-wrap md:pr-12">{vector.metadata[keyData]}</div>
                </div>
              </div>
            )
          })
        }
        
      </div>
      {vector.score && <div onClick={() => {setActiveChatIndex(activeChatIndex === index? -1 : index)}} className="absolute right-2 bottom-4 cursor-pointer  rounded-full">
        <Image
          src="/images/vector/robot.png"
          alt="logo"
          width={30}
          height={30}
          className="w-full dark:hidden"
        />
      </div>}
      {(index === activeChatIndex && !!filtersApplied) && <Chatbot search={search} context={vector.metadata.content} matchScore={vector.score}/>}
    </div>
    
  )
}

export default VectorCard;