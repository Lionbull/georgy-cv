import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import { profile } from "$lib/cv/profile";

export const AppKind = {
  Window: "window",
  Link: "link",
  Menu: "menu",
} as const;

export type AppKind = (typeof AppKind)[keyof typeof AppKind];

export const WindowAppId = {
  Terminal: "terminal",
  ClassicCV: "classicCV",
} as const;

export type WindowAppId = (typeof WindowAppId)[keyof typeof WindowAppId];

export const AppId = {
  Terminal: WindowAppId.Terminal,
  ClassicCV: WindowAppId.ClassicCV,
  LinkedIn: "linkedin",
  GitHub: "github",
} as const;

export type AppId = (typeof AppId)[keyof typeof AppId];

export type WindowRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/** Runtime state for every dock icon (links only use `bouncing`). */
export type AppInstance = {
  id: AppId;
  bouncing: boolean;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  focused: boolean;
  zIndex: number;
  rect: WindowRect;
};

export type AppLink = {
  label: string;
  href: string;
};

export type AppMeta = {
  title: string;
  label: string;
  kind: AppKind;
  href?: string;
  links?: AppLink[];
};

const DEFAULT_RECTS: Record<WindowAppId, WindowRect> = {
  [WindowAppId.Terminal]: { x: 120, y: 56, width: 900, height: 580 },
  [WindowAppId.ClassicCV]: { x: 160, y: 64, width: 940, height: 640 },
};

const EMPTY_RECT: WindowRect = { x: 0, y: 0, width: 0, height: 0 };

export const APP_META: Record<AppId, AppMeta> = {
  [AppId.Terminal]: {
    title: `Terminal — ${profile.name} CV`,
    label: "Terminal",
    kind: AppKind.Window,
  },
  [AppId.ClassicCV]: {
    title: "Classic CV",
    label: "Classic CV",
    kind: AppKind.Window,
  },
  [AppId.LinkedIn]: {
    title: "LinkedIn",
    label: "LinkedIn",
    kind: AppKind.Link,
    href: profile.contact.linkedin,
  },
  [AppId.GitHub]: {
    title: "GitHub",
    label: "GitHub",
    kind: AppKind.Menu,
    links: [...profile.github],
  },
};

export const windowDockApps: WindowAppId[] = [
  WindowAppId.Terminal,
  WindowAppId.ClassicCV,
];
export const linkDockApps: AppId[] = [AppId.LinkedIn, AppId.GitHub];
export const dockApps: AppId[] = [...windowDockApps, ...linkDockApps];

export function isWindowApp(id: AppId): id is WindowAppId {
  return APP_META[id].kind === AppKind.Window;
}

function windowInstance(id: WindowAppId, zIndex: number): AppInstance {
  return {
    id,
    bouncing: false,
    open: false,
    minimized: false,
    maximized: false,
    focused: false,
    zIndex,
    rect: { ...DEFAULT_RECTS[id] },
  };
}

function launcherInstance(id: AppId): AppInstance {
  return {
    id,
    bouncing: false,
    open: false,
    minimized: false,
    maximized: false,
    focused: false,
    zIndex: 0,
    rect: { ...EMPTY_RECT },
  };
}

function createInitialState(): Record<AppId, AppInstance> {
  return {
    [AppId.Terminal]: windowInstance(WindowAppId.Terminal, 10),
    [AppId.ClassicCV]: windowInstance(WindowAppId.ClassicCV, 1),
    [AppId.LinkedIn]: launcherInstance(AppId.LinkedIn),
    [AppId.GitHub]: launcherInstance(AppId.GitHub),
  };
}

function createAppsStore() {
  const store = writable(createInitialState());
  const { subscribe, update } = store;
  let nextZ = 20;

  function bumpZ(): number {
    nextZ += 1;
    return nextZ;
  }

  function visibleWindows(state: Record<AppId, AppInstance>) {
    return Object.values(state)
      .filter((a) => isWindowApp(a.id) && a.open && !a.minimized)
      .sort((a, b) => b.zIndex - a.zIndex);
  }

  function clearFocus(state: Record<AppId, AppInstance>) {
    for (const app of Object.values(state)) app.focused = false;
  }

  function focusTopVisible(state: Record<AppId, AppInstance>) {
    const top = visibleWindows(state)[0];
    if (top) top.focused = true;
  }

  /** Open / restore / focus a window app. Returns true if it was closed before. */
  function activateWindow(state: Record<AppId, AppInstance>, id: WindowAppId): boolean {
    const app = state[id];
    const wasClosed = !app.open;
    clearFocus(state);
    app.open = true;
    app.minimized = false;
    app.focused = true;
    app.zIndex = bumpZ();
    return wasClosed;
  }

  function triggerBounce(id: AppId) {
    update((state) => {
      state[id].bouncing = true;
      return { ...state };
    });
    setTimeout(() => {
      update((state) => {
        state[id].bouncing = false;
        return { ...state };
      });
    }, 550);
  }

  function openExternal(id: AppId) {
    const meta = APP_META[id];
    if (meta.kind !== AppKind.Link || !meta.href) return;
    triggerBounce(id);
    if (browser) window.open(meta.href, "_blank", "noopener,noreferrer");
  }

  function openApp(id: AppId) {
    if (!isWindowApp(id)) {
      if (APP_META[id].kind === AppKind.Menu) triggerBounce(id);
      else openExternal(id);
      return;
    }
    let shouldBounce = false;
    update((state) => {
      shouldBounce = activateWindow(state, id);
      return { ...state };
    });
    if (shouldBounce) triggerBounce(id);
  }

  function closeApp(id: AppId) {
    if (!isWindowApp(id)) return;
    update((state) => {
      const app = state[id];
      app.open = false;
      app.minimized = false;
      app.maximized = false;
      app.focused = false;
      focusTopVisible(state);
      return { ...state };
    });
  }

  function minimizeApp(id: AppId) {
    if (!isWindowApp(id)) return;
    update((state) => {
      state[id].minimized = true;
      state[id].focused = false;
      focusTopVisible(state);
      return { ...state };
    });
  }

  function focusApp(id: AppId) {
    if (!isWindowApp(id)) return;
    update((state) => {
      if (!state[id].open) return state;
      activateWindow(state, id);
      return { ...state };
    });
  }

  return {
    subscribe,
    getMeta: (id: AppId) => APP_META[id],
    bounceApp: (id: AppId) => triggerBounce(id),
    openLink: (href: string) => {
      if (browser) window.open(href, "_blank", "noopener,noreferrer");
    },
    openApp,
    closeApp,
    minimizeApp,
    focusApp,
    toggleMaximize: (id: AppId) => {
      if (!isWindowApp(id)) return;
      update((state) => {
        // Preserve maximize toggle across activate (which doesn't touch maximized)
        const next = !state[id].maximized;
        activateWindow(state, id);
        state[id].maximized = next;
        return { ...state };
      });
    },
    toggleFromDock: (id: AppId) => {
      const meta = APP_META[id];
      if (meta.kind === AppKind.Menu) {
        triggerBounce(id);
        return;
      }
      if (meta.kind === AppKind.Link) {
        openExternal(id);
        return;
      }

      const app = get(store)[id];
      if (!app.open) {
        openApp(id);
        return;
      }
      if (app.minimized || !app.focused) {
        focusApp(id);
        return;
      }
      minimizeApp(id);
    },
    setRect: (id: AppId, rect: Partial<WindowRect>) => {
      if (!isWindowApp(id)) return;
      update((state) => {
        state[id].rect = { ...state[id].rect, ...rect };
        return { ...state };
      });
    },
    openClassicCVOnly: () => {
      update((state) => {
        for (const wid of windowDockApps) {
          if (wid === WindowAppId.ClassicCV) continue;
          state[wid].open = false;
          state[wid].minimized = false;
          state[wid].maximized = false;
          state[wid].focused = false;
        }
        activateWindow(state, WindowAppId.ClassicCV);
        return { ...state };
      });
      triggerBounce(AppId.ClassicCV);
    },
  };
}

export const apps = createAppsStore();
