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
        className={
          // signup.signupStatus?
          // `mt-20 mb-4 w-[75%] md:w-[25%] text-base md:text-lg ml-16 md:ml-[41%]` :
          `mt-4 ml-16 w-[75%] md:w-[25%] text-base md:text-lg md:ml-[41%]`
        }
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
          className="  pt-2 pb-2 pl-4 pr-4  bg-[#363960] text-gray-100 ml-16 mt-6 px-6 md:px-6 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-20 md:ml-56 hover:bg-gray-300  hover:text-[#363960]"
        >
          submit
        </button>
        <button
          className="pt-2 pb-2 bg-[#363960] text-gray-100 ml-16 mt-6 pl-6 pr-6 md:px-6 py-2 md:py-3 text-xl md:text-2xl font-medium rounded-2xl md:mt-20 md:ml-56 hover:bg-gray-300  hover:text-[#363960]"
          onClick={props.loginPath}
        >
          Login
        </button>
      </form>
    </div>
  );
};
