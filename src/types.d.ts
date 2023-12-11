declare module "@analytics/google-tag-manager" {
  type AnalyticsPlugin = import("analytics").AnalyticsPlugin;

  type GoogleTagManagerConfig = {
    auth?: string;
    containerId: string;
    customScriptSrc?: string;
    dataLayerName?: string;
    debug?: boolean;
    execution?: string;
    preview?: string;
  };

  function googleTagManager(config: GoogleTagManagerConfig): AnalyticsPlugin;
  export default googleTagManager;
}
