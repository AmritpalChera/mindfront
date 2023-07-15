

const TheirMessage = ({ text}: any) => {
  return (
    <div className="flex flex-col group my-1">
      <div className="px-6 py-3 rounded-t-2xl !rounded-r-2xl bg-dark  dark:bg-dark max-w-xs lg:max-w-3xl text-gray-200 whitespace-pre-wrap">{text}</div>
    </div>
  );
};

export default TheirMessage;