import type { RouteManifest } from "./routes";
export type RoutesFormat = "json" | "jsx";
export declare function formatRoutes(routeManifest: RouteManifest, format: RoutesFormat): string;
export declare function formatRoutesAsJson(routeManifest: RouteManifest): string;
export declare function formatRoutesAsJsx(routeManifest: RouteManifest): string;
