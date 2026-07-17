"use client";

import { Component, type ReactNode } from "react";

/**
 * Safety net around the WebGL Canvas: useJourneyMode already feature-detects
 * WebGL up front, but context creation can still fail or be lost after mount
 * (driver resets, sandboxed renderers, etc.). Without this boundary, an
 * uncaught error there takes down the entire React tree.
 */
export class WebGLErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
