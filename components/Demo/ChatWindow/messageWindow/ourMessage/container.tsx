"use client";

const OurMessageContainer = ({ children }: any) => {
  return (
    <div className="flex flex-row justify-end mt-2">
      <div className="messages text-sm text-white grid grid-flow-row">
        {children}
      </div>
    </div>
  );
};

export default OurMessageContainer;