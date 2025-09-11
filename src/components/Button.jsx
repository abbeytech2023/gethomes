import { Link } from "react-router-dom";

// import Link from "next/link";

function Button({ children, type, to, disabled, onClick }) {
  const base =
    "bg-[#144c6f] mt-[1rem] text-sm cursor-pointer disabled:cursor-not-allowed text-[#c7e1f2] uppercase font-semibold  tracking-wide inline-block rounded-full focus:outline-none focus:ring focus:ring-[text-[#c7e1f2]]  focus:ring-offset-2 hover:bg-[#144c6f] transition-all duration-300 ";

  const styles = {
    primary: base + "w-auto  text-center px-[4rem] py-[1rem]  md:py-4",

    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-xs",
    secondary:
      base +
      "border-2 border-stone-300 text-sm focus:ring-stone-200 px-4  sm:px-6 md:py-3.5  hover:text-white disabled:cursor-not-allowed uppercase font-semibold text-[#fff]  tracking-wide inline-block rounded-full focus:outline-none py-2.5 focus:ring focus:ring-stone-300  focus:ring-offset-2 hover:bg-[rgba(20, 76, 111, 0.503)]  transition-all duration-300 ",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button
        type="small"
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
      >
        {children}
      </button>
    );
  return (
    <button to={to} disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
