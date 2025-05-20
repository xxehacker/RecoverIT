import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = ({ faqs }) => {
  console.log("faqs", faqs);
  return (
    <div className="py-4 w-full min-h-screen max-w-xl sm:max-w-5xl  mx-auto">
      <div className="text-center mb-16">
        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
          F.A.Q
        </p>
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </h3>
      </div>

      <div className="px-10 sm:px-16">
        {faqs.map((faq) => (
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-gray-200/60 m-2 p-6">
                {faq?.question}
              </AccordionTrigger>
              <AccordionContent className="m-2 p-2">
                {faq?.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
