import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return <ErrorOverlay onClose={() => {}} reload />;
    }

    return this.props.children;
  }
}
