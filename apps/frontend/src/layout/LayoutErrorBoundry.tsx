import React from "react";
import { Error } from "../components/Error";
import { Container } from "./Container";
import { Header } from "./Header";
class LayoutErrorBoundary extends React.Component<
    React.PropsWithChildren,
    { hasError: boolean }
> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <Header />
                    <main>
                        <Container>
                            <Error message={`Something went wrong`}></Error>
                        </Container>
                    </main>
                </div>
            );
        }

        return this.props.children;
    }
}

export default LayoutErrorBoundary;
