import React from "react";
import ButtonPrimary from "@/shared/ui/ButtonPrimary";

const Newsettler: React.FC = () => {
  return (
    <div className="bg-dark-blue flex h-141.5 w-full flex-col items-center justify-center">
      <h2 className="font-poppins mb-4 text-[42px] font-semibold text-white">
        Transform.Ed Briefing
      </h2>
      <p className="mb-7 w-149.75 text-center text-[16px] font-normal text-white">
        Unlock the power of education with Transform.Ed, a curated premium newsletter by the Global
        Citizenship Foundation. Join us on a transformative journey, sharing insights, ideas, &
        opportunities to empower educators shaping the many futures of education!
      </p>
      <div className="flex h-15 w-155 gap-1.5">
        <input
          className="placeholder-gray h-full grow rounded-xl bg-white pl-4.75"
          placeholder="Type your email"
          type="text"
        />
        <ButtonPrimary className="w-63.25" href="/">
          Subscribe Now
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Newsettler;
