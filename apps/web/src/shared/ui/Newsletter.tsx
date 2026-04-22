import { ButtonPrimary } from "@/shared/ui/ButtonPrimary";

export function Newsletter() {
  return (
    <div className="bg-dark-blue flex w-full min-h-141.5 py-10 flex-col items-center justify-center px-12.5">
      <h2 className="font-poppins mb-4 text-[42px] font-semibold text-white text-center">
        Transform.Ed Briefing
      </h2>
      <p className="mb-7 max-w-149.75 text-center text-[16px] font-normal text-white">
        Unlock the power of education with Transform.Ed, a curated premium newsletter by the Global
        Citizenship Foundation. Join us on a transformative journey, sharing insights, ideas, &
        opportunities to empower educators shaping the many futures of education!
      </p>
      <div className="flex max-w-155 w-full gap-1.5 items-center flex-wrap">
        <input
          suppressHydrationWarning
          className="placeholder-gray grow rounded-xl bg-white pl-4.75 min-h-15"
          placeholder="Type your email"
          type="text"
        />
        <ButtonPrimary className="w-63.25 sm:w-[253px]" href="/">
          Subscribe Now
        </ButtonPrimary>
      </div>
    </div>
  );
}
