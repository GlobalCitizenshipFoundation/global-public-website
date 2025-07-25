import React from "react";
import ButtonPrimary from "./ButtonPrimary";

const Newsettler: React.FC = () => {
  return (
    <div className='bg-dark-blue w-full h-[566px] flex justify-center items-center flex-col'>
      <h2 className="font-poppins font-semibold text-[42px] text-white mb-4">Transform.Ed Briefing</h2>
      <p className="text-white w-[599px] text-center text-[16px] font-normal mb-7">
        Unlock the power of education with Transform.Ed, a curated premium newsletter by the Global Citizenship Foundation. Join us on a transformative journey, sharing insights, ideas, & opportunities to empower educators shaping the many futures of education!
      </p>
      <div className="h-[60px] w-[620px] flex gap-1.5">
        <input className="bg-white h-full rounded-xl pl-[19px] placeholder-gray grow" placeholder="Type your email" type="text" />
        <ButtonPrimary width={253} href="/">
            Subscribe Now
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Newsettler;
