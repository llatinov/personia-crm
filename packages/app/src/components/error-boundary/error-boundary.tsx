import { ErrorOverlay } from "app/components/error-overlay/error-overlay";
import { AppContext, AppState, IAppArguments, uiSetError } from "app/lib/app-context";
import { Component, Dispatch, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = { hasError: false };
  static override contextType = AppContext;

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const [, dispatch] = this.context as [AppState, Dispatch<IAppArguments>];
    uiSetError(dispatch, true);
    console.error(error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return <ErrorOverlay reload />;
    }

    return this.props.children;
  }
}
