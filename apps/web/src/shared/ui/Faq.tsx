import { Container } from "./Container";
import { FaqItem } from "./FaqItem";

type ExampleQuestion = {
  title: string;
  answer: string;
};

export function Faq() {
  const exampleQuestion: ExampleQuestion = {
    title: "Citizenship and sustainable development?",
    answer:
      "We work to wards transforming education for global citizenship and sustainable development Take advantage of the excellent upcoming and featured learning and opportunities.",
  };
  const exampleArr: ExampleQuestion[] = Array(6).fill(exampleQuestion);

  return (
    <div className="bg-[#F6F4F0] py-12 lg:py-40">
      <Container variant="regular">
        <div className="">
          <h2 className="text-3xl md:text-4xl text-center">Our Team Frequently Asked Questions</h2>
          <p className="text-l md:text-xl text-center text-light-gray font-normal max-w-220 mx-auto">
            We work to wards transforming education for global citizenship and sustainable
            development. We work to wards transforming.
          </p>
        </div>
        <div className="pt-12">
          {exampleArr.map((faq, index) => {
            return <FaqItem key={`${index}-${faq.title}`} faq={faq} />;
          })}
        </div>
      </Container>
    </div>
  );
}
