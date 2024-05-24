import { Head } from "./header";

export const Signup = (props: {
  type: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
  email: string;
  password: string;
  loginPath: () => void;
}) => {
  return (
    <div className="text-[#363960] font-sans">
      <Head />

      <h1 className="mt-16 text-xl font-medium text-center">{props.type}</h1>
      <form
        className={`mt-4 ml-16 w-[75%] md:w-[25%] text-base md:text-lg md:ml-[41%]`}
        onSubmit={props.handleSubmit}
      >
        <label htmlFor="name" className="">
          Enter your Name
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2  rounded-md w-[90%]"
          onChange={props.handleChange}
          type="name"
          name="username"
          placeholder="name"
          value={props.username}
          required
        />
        <br />
        <label htmlFor="email" className="">
          Enter your email
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%]"
          onChange={props.handleChange}
          type="email"
          name="email"
          placeholder="email"
          value={props.email}
          required
        />
        <br />
        <label htmlFor="password" className="">
          Enter your Password
        </label>
        <br />
        <input
          className="border border-slate-800 my-2 px-2 rounded-md w-[90%] "
          onChange={props.handleChange}
          type="password"
          name="password"
          placeholder="password"
          value={props.password}
          required
        />
        <br />

        <button
          type="submit"
          className="pt-3 pb-3 pl-6 pr-6  bg-[#363960] text-gray-100 ml-20 mt-6  md:px-6 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-4 md:ml-20 hover:bg-gray-300  hover:text-[#363960]"
        >
          Signup
        </button>
        <p className="font-medium mt-4">Already register?</p>
        <button
          onClick={props.loginPath}
          className="  pt-3 pb-3 pl-8 pr-8  bg-[#363960] text-gray-100 ml-20 mt-6  md:px-7 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-4 md:ml-20 hover:bg-gray-300  hover:text-[#363960]"
        >
          Login
        </button>
      </form>
    </div>
  );
};
