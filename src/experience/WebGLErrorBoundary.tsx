"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type WebGLErrorBoundaryProps = Readonly<{ children: ReactNode; fallback: ReactNode }>;
type WebGLErrorBoundaryState = Readonly<{ hasError: boolean }>;

export class WebGLErrorBoundary extends Component<
  WebGLErrorBoundaryProps,
  WebGLErrorBoundaryState
> {
  public state: WebGLErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    void _error;
    void _errorInfo;
  }

  public render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
