import { signUpUri } from "../home-cta/signupUrl.js";
import { Container } from "./Container";
import { NavLink } from "./NavLink";
import StyledHref from "./StyledHref.jsx";

export function Footer() {
    return (
        <footer className="">
            <div className="py-6">
                <Container className="">
                    <p className="text-center text-3xl text-white">Miller</p>
                    <nav className="mt-10 text-sm" aria-label="quick links">
                        <div className="-my-1 flex justify-center gap-x-6">
                            <NavLink href="/#features">Features</NavLink>
                            <NavLink href="/#pricing">Pricing</NavLink>
                            <StyledHref href={signUpUri}>
                                Get Started
                            </StyledHref>
                        </div>
                    </nav>
                </Container>
            </div>
            <div className="flex w-full flex-col bg-[#161b22] py-4 text-left sm:flex-row-reverse sm:justify-between">
                <Container className="mx-0 md:mx-auto">
                    <div className="mt-2 flex w-full items-center space-x-4">
                        <p className="text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} BuildWithMiller
                        </p>
                        <NavLink href="/terms">Terms</NavLink>
                        <NavLink href="/privacy">Privacy</NavLink>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
