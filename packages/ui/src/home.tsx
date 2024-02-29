export const Landing = ({
  className,
  titleOne,
  titleTwo,
  para,
  paraTwo,
  getStart,
}: {
  className: string;
  titleOne: string;
  titleTwo: string;
  para: string;
  paraTwo: string;
  getStart: () => void;
}) => {
  return (
    <div className={`${className} text-[#363960] font-sans `}>
      <h1 className=" text-2xl md:text-3xl font-bold absolute top-2 left-32 md:left-[74%] md:top-6">
        CodeCraft
      </h1>
      <h2 className="text-sm md:text-xl absolute top-9 left-20 md:left-[70%] md:top-16 font-semibold">
        unlock your coding potential!
      </h2>
      <div className="bg-gray-100  ml-10 pb-8 pt-4 w-[80%] rounded-2xl mt-6 md:w-[40%] h-max md:h-[62%] md:absolute md:top-[20%] md:left-[55%]">
        <h2 className=" text-xl md:text-3xl text-center font-bold">
          {titleOne}
        </h2>
        <h2 className=" text-center font-medium text-sm md:text-xl">
          {titleTwo}
        </h2>
        <p className="text-justify font-medium pl-2 pr-2 mt-4 w-[90%] ml-4 md:text-xl">
          {para}
        </p>
        <p className="text-justify font-medium pl-2 pr-2 mt-4 w-[90%] ml-4 md:text-xl hidden md:block">
          {paraTwo}
        </p>
        <button
          className=" bg-[#363960] text-gray-100 ml-16 mt-10 px-6 md:px-6 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-20 md:ml-56 hover:bg-[#eaebf7]  hover:text-[#363960]"
          onClick={getStart}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};
