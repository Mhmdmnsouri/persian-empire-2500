"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type AssetBoundaryProps = Readonly<{ children: ReactNode; fallback: ReactNode }>;
type AssetBoundaryState = Readonly<{ hasError: boolean }>;

export class ArtifactAssetBoundary extends Component<AssetBoundaryProps, AssetBoundaryState> {
  public state: AssetBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): AssetBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    void error;
    void errorInfo;
  }

  public render(): ReactNode {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
