import React from "react";
import Card1 from "../Card1";

const Home2 = () => {
  const cards = [
    {
      title: "Smart Invoice Generator",
      description:
        "Create professional, brand-aligned invoices in seconds with pre-built templates and automated tax calculations.",
      image: "/img/invoice.png",
    },
    {
      title: "Real-time Revenue Dashboard",
      description:
        "Visualize your financial health with interactive charts that track income, expenses, and pending payments.",
      image: "/img/analytic.png",
    },
    {
      title: "Customer Management",
      description:
        "Centralized hub for all client interactions, payment histories, and automated follow-ups for unpaid invoices.",
      image: "/img/customer.png",
    },
    {
      title: "Payment Tracking",
      description:
        "Get notified the moment an invoice is viewed or paid. Integrations with top payment gateways ensure seamless flow.",
      image: "/img/tracker.png",
    },
    {
      title: "Analytics & Growth Insights",
      description:
        "Advanced forecasting tools that help you identify your most profitable clients and peak revenue seasons.",
      image: "/img/analytic2.png",
    },
    {
      title: "Automated Reports",
      description:
        "Schedule weekly or monthly financial reports sent directly to your inbox or exported for tax compliance.",
      image: "/img/automated.png",
    },
  ];

  return (
    <div className=" p-50 pt-4 pb-4">
      <div className=" h-full flex flex-col gap-5  justify-center items-center">
        <span className="text-4xl font-bold">
          Everything you need to master your money
        </span>
        <span className="text-lg w-150 text-center">
          Powering thousands of creators with professional tools that were once
          only available to large enterprises.
        </span>
      </div>

      <div className="h-full flex flex-row flex-wrap items-center justify-center p-50  xs:p-5 gap-5 pt-5 pb-5 ">
        {cards.map((card, idx) => {
          return <Card1 key={idx} card={card} />;
        })}
      </div>
    </div>
  );
};

export default Home2;
