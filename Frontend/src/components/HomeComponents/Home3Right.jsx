import React from "react";

const Home3Right = () => {
  const steps = [
    {
      id: 1,
      title: "Create Invoice",
      description: "Select a client and add your line items effortlessly.",
      image: "/img/invoice-create.png",
    },
    {
      id: 2,
      title: "Send Invoice",
      description: "Share via secure link, email, or WhatsApp instantly.",
      image: "/img/invoice-send.png",
    },
    {
      id: 3,
      title: "Get Paid",
      description: "Monitor status and receive funds directly to your bank.",
      image: "/img/invoice-paid.png",
    },
  ];
  return (
    <div className="flex items-center w-1/2">
      <div className="flex flex-col gap-10">
        <span className="text-2xl font-bold">
          Simplify your billing cycle in 3 steps
        </span>
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <p className="text-2xl bg-(--color-primary) text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
              {step.id}
            </p>
            <div className="ml-4">
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="text-(--text-secondary)">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home3Right;
