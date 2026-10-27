import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) {
    console.error('3D scene error:', error);
    this.props.onError?.(error);
  }
  render() { return this.state.failed ? null : this.props.children; }
}
