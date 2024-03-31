export const Menu = (props: {
  menuStatus: boolean;
  menuClicked: () => void;
  closeClicked: () => void;
  logout: () => void;
  type: string;
  profile: {
    name: string;
    email: string;
    courses?: number;
    publishedCourses?: number;
    purchasedCourses?: number;
  };
}) => {
  return !props.menuStatus ? (
    <div className="absolute right-0 top-4">
      <button
        className="sm:hidden text-gray-800 hover:text-gray-900 focus:outline-none "
        onClick={props.menuClicked}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>{" "}
      <div className="hidden md:block absolute right-[1100%] mt-4 font-bold text-xl text-[#363960]">
        <p className="">Hello {props.profile.name}</p>
        <p className=""> {props.profile.email}</p>
        {props.type === "admin" ? (
          <>
            <p className="">Total Course : {props.profile.courses}</p>
            <p className="">
              Published Courses: {props.profile.publishedCourses}
            </p>
          </>
        ) : (
          <p className="">
            Purchased Courses: {props.profile.purchasedCourses}
          </p>
        )}
      </div>
      <button
        onClick={props.logout}
        className="hidden md:block right-0 text-xl font-bold text-[#eaebf7] bg-[#363960] px-3 py-2 rounded-xl hover:text-[#363960] hover:bg-gray-300  mt-4 mr-4"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="z-10 bg-gray-100 absolute right-0 top-0 h-[40%] w-[60%] rounded-xl bg-opacity-80 text-[#363960] font-medium">
      <button
        onClick={props.closeClicked}
        className="font-bold text-2xl absolute right-2 mt-4"
      >
        X
      </button>
      <div className="mt-16 ml-6">
        <p className=""> {"Hello " + props.profile.name}</p>
        <p className="">{props.profile.email}</p>
        {props.type === "admin" ? (
          <>
            <p className="">Total Course : {props.profile.courses}</p>
            <p className="">
              Published Courses: {props.profile.publishedCourses}
            </p>
          </>
        ) : (
          <p className="">
            Purchased Courses: {props.profile.purchasedCourses}
          </p>
        )}
        <button
          onClick={props.logout}
          className="text-xl font-bold text-[#eaebf7] bg-[#363960] ml-4 mt-8 px-3 py-2 rounded-xl hover:text-[#363960] hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
