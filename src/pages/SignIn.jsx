import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

function SignIn() {
  return <Tabbed />;
}

export default SignIn;

function Tabbed() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="w-full flex flex-col items-center h-screen  pt-20 pb-16">
      <div className="  flex-col mt-5  shadow-2xl z-0 overflow-y-scroll ">
        <h1 className="font-normal text-4xl text-center pt-11 text-[#0f2c3d]">
          Welcome
        </h1>
        <div className=" flex justify-center items-center gap-8 text-lg mb-10 mt-9">
          <Tab num={1} activeTab={activeTab} setActiveTab={setActiveTab}>
            New Account
          </Tab>
          <Tab num={2} activeTab={activeTab} setActiveTab={setActiveTab}>
            SignIn
          </Tab>
        </div>
        <div className="flex justify-center ">
          {activeTab === 1 ? <SignUpForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

function Tab({ children, activeTab, num, setActiveTab }) {
  return (
    <button
      onClick={() => {
        setActiveTab(num);
      }}
      className={activeTab === num ? `border-green-600 border-b-[6px]` : ""}
    >
      {children}
    </button>
  );
}

// function FormToDisplay({ num, activeTab, children }) {
//   const displayForm = activeTab === num;
//   // return <div>{displayForm ==}</div>;
// }
