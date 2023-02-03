import React from "react";

function Privacy() {
  return (
    <>
      <div className="text-white">
        <div className="w-full px-4 py-12 text-center bg-dark-shade">
          <p className="text-5xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl lg:tracking-wide">
            Privacy Policy
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto my-8 ly:mb-20 space-y-8">
        <p className="text-justify">
          We help ensure product development team members get relevant job
          offers.We collect information to provide better services to all our
          users.
        </p>
        <p className="text-justify">
          From the filters you provide us and the ways you interact with the
          services we provide. We use third-arty tools like Auth0 and Google
          Analytics to help provide you with this service.
        </p>
        <p className="text-justify">
          We also use your information to ensure that our services are working
          as intended, such as tracking outages or troubleshooting issues that
          you report to us.
        </p>
        <p className="text-justify">
          We use the information we collect in our existing services to help us
          develop new ones.
        </p>
        <p className="text-justify">
          We use data for analytics and measurement to understand how our
          services are used.
        </p>
        <p className="text-justify">
          We use information that we collect, such as your email address, to
          interact with you directly.
        </p>
        <p className="text-justify">
          Our service and the third parties we use are global business and as
          such your data could be stored in any country at any time. If you want
          to retrieve or delete your data contact us at
          contact@filteredreduced.dev.
        </p>
      </div>
    </>
  );
}

export default Privacy;
