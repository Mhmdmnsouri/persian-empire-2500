"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { ArtifactFallback } from "./ArtifactFallback";

type AssetBoundaryProps = Readonly<{ children: ReactNode }>;
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
    return this.state.hasError ? <ArtifactFallback /> : this.props.children;
  }
}
