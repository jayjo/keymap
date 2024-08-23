import * as React from "react";
import type { Location } from "@remix-run/router";
type RemixErrorBoundaryProps = React.PropsWithChildren<{
    location: Location;
    isOutsideRemixApp?: boolean;
    error?: Error;
}>;
type RemixErrorBoundaryState = {
    error: null | Error;
    location: Location;
};
export declare class RemixErrorBoundary extends React.Component<RemixErrorBoundaryProps, RemixErrorBoundaryState> {
    constructor(props: RemixErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): {
        error: Error;
    };
    static getDerivedStateFromProps(props: RemixErrorBoundaryProps, state: RemixErrorBoundaryState): {
        error: Error | null;
        location: Location<any>;
    };
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
/**
 * When app's don't provide a root level ErrorBoundary, we default to this.
 */
export declare function RemixRootDefaultErrorBoundary({ error, isOutsideRemixApp, }: {
    error: unknown;
    isOutsideRemixApp?: boolean;
}): React.JSX.Element;
export declare function BoundaryShell({ title, renderScripts, isOutsideRemixApp, children, }: {
    title: string;
    renderScripts?: boolean;
    isOutsideRemixApp?: boolean;
    children: React.ReactNode | React.ReactNode[];
}): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
export {};
