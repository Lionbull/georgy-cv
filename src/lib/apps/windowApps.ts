import TerminalApp from "$lib/components/apps/TerminalApp.svelte";
import ClassicCVApp from "$lib/components/apps/ClassicCVApp.svelte";
import { WindowAppId, type WindowAppId as WindowAppIdType } from "$lib/stores/apps";

export type WindowAppEntry = {
  id: WindowAppIdType;
  /** Dark traffic-light / title bar (Terminal) */
  darkChrome?: boolean;
  component: typeof TerminalApp;
};

/** Single registry for desktop windows and mobile sheets */
export const WINDOW_APPS: WindowAppEntry[] = [
  { id: WindowAppId.Terminal, darkChrome: true, component: TerminalApp },
  { id: WindowAppId.ClassicCV, component: ClassicCVApp },
];
