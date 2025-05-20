import FAQ from "@/components/FAQ";
import React from "react";
import { faqs } from "@/utils/helper";

const FAQPage = () => {
  console.log(faqs);
  return <FAQ faqs={faqs} />;
};

export default FAQPage;
