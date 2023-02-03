import React, { FunctionComponent, useEffect, useState } from "react";
import ConstantSettings from "./ConstantSettings";

type EasyStepProps = {
    title: string;
    subtitle: string;
    children?: React.ReactNode;
};
const EasyStep: FunctionComponent<EasyStepProps> = ({
    title,
    subtitle,
    children,
}) => {
    return (
        <div className="flex-1 mb-8 overflow-hidden lg:mx-12 text-light-accent lg:mb-0">
            <div className="text-2xl border-b-2 border-light-accent">
                <div className="mb-2 ">{title}</div>
            </div>
            <div className="py-2 text-2xl lg:py-5 text-light-accent">
                {subtitle}
            </div>
            {children}
        </div>
    );
};

const filterList = [
    { text: "Family friendly policies" },
    { text: "Remote from anywhere" },
    { text: "Minimum salary $XXX,XXX" },
    { text: "An active diversity program" },
    { text: "and more..." },
];

function Home() {
    const [animatingIndex, setAnimatingIndex] = useState(0);

    useEffect(() => {
        const animatingIndexMax = filterList.length - 2; // skip and more :)

        let nextIndex = animatingIndex + 1;

        if (nextIndex > animatingIndexMax) {
            nextIndex = 0;
        }
        console.log("trigger animate");
        const interval = setInterval(() => {
            setAnimatingIndex(nextIndex);
        }, 3000);

        return () => clearInterval(interval);
    }, [animatingIndex]);

    return (
        <>
            <div className=" text-white ">
                <div className="w-full px-4 py-20 text-center bg-dark-shade">
                    <p className="text-5xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl mb-14 lg:tracking-wide">
                        Easily filter recruiter messages
                    </p>
                    <p className="font-mono text-3xl font-extrabold lg:text-4xl sm:text-4xl sm:tracking-tight lg:tracking-wide">
                        Because you only want to hear about roles with...
                    </p>
                </div>
            </div>
            <div className="py-8 font-mono text-center bg-main-brand">
                <div className="inline-block px-4 py-4 mx-auto max-w-7xl">
                    <div className="text-left space-y-4">
                        {filterList.map((item, index) => {
                            return (
                                <p
                                    key={index}
                                    className={`md:text-4xl lg:text-5xl sm:text-2xl text-xl sm:tracking-tight lg:tracking-wide font-extrabold ${
                                        animatingIndex === index
                                            ? "cta-new-tick"
                                            : "cta-new"
                                    } p-2 rounded-lg`}
                                >
                                    {item.text}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="py-2 pb-8 mb-8 bg-main-brand lg:py-16">
                <div className="w-full px-4 py-4 mb-8 text-center">
                    <p className="text-3xl font-extrabold text-dark-shade sm:text-4xl sm:tracking-tight lg:text-5xl mb-14 lg:tracking-wide">
                        Share your <span className="italic">private</span> link
                        to recruiters
                    </p>
                    <p className="text-3xl font-extrabold text-dark-shade sm:text-4xl sm:tracking-tight lg:text-5xl lg:mb-14 lg:tracking-wide">
                        See at a glance which job submissions you really care
                        about
                    </p>
                </div>
                <div className="w-full mx-auto text-center">
                    <a
                        className="flex-none w-full px-6 py-3 text-lg font-semibold border border-transparent sm:w-auto bg-dark-shade text-light-shade leading-6 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        href={ConstantSettings.appUrl}
                    >
                        Get started now
                    </a>
                </div>
            </div>

            <div className="mx-4 mb-8 lg:flex lg:mx-20 lg:mb-20">
                <EasyStep title="1." subtitle="Setup personal job filters">
                    <div>
                        <p className="py-5">
                            Are you looking for remote work specifically? Do you
                            have a family and need flexibility? Or are you only
                            interested in offers higher than your current total
                            compensation?
                        </p>
                        <p>
                             You configure all your job requirements with
                            filters.
                        </p>
                    </div>
                </EasyStep>
                <EasyStep title="2." subtitle="No effort responses">
                    <div>
                        <p className="py-5">
                            When recruiters approach you on social media
                            platforms or anywhere, you respond with your unique
                            link.
                        </p>
                        <p>
                             The recruiter can enter the job details in your
                            personalized form, or not, as they wish.
                        </p>
                         
                    </div>
                </EasyStep>
                <EasyStep title="3." subtitle="Only perfect jobs for you">
                    <div className="py-5">
                        We will only bother you if the job has all the
                        requirements to exceed your personal filters.
                    </div>
                </EasyStep>
            </div>
            <div className="mb-8">
                <div className="w-full mx-auto text-center">
                    <a
                        className="flex-none w-full px-6 py-3 text-lg font-semibold text-white border border-transparent sm:w-auto bg-main-brand leading-6 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-900 focus:outline-none transition-colors duration-200"
                        href={ConstantSettings.appUrl}
                    >
                        Get started now
                    </a>
                </div>
            </div>
        </>
    );
}

export default Home;
