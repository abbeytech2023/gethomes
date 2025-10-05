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
    <div className="flex flex-col items-center w-full h-screen pt-20 pb-16">
      <div className="z-0 flex-col mt-5 overflow-y-scroll shadow-2xl ">
        <h1 className="font-normal text-4xl text-center pt-11 text-[#0f2c3d]">
          Welcome
        </h1>
        <div className="flex items-center justify-center gap-8 mb-10 text-lg mt-9">
          <Tab num={1} activeTab={activeTab} setActiveTab={setActiveTab}>
            SignIn
          </Tab>
          <Tab num={2} activeTab={activeTab} setActiveTab={setActiveTab}>
            New Account
          </Tab>
        </div>
        <div className="flex justify-center ">
          {activeTab === 1 ? <LoginForm /> : <SignUpForm />}
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
