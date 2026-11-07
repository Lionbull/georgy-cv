import { apps, APP_META, AppKind, type AppId } from "$lib/stores/apps";

/** Stop LinkMenu outside-click from swallowing the menu toggle */
export function stopMenuPointer(e: PointerEvent, id: AppId) {
  if (APP_META[id].kind === AppKind.Menu) e.stopPropagation();
}

/**
 * Shared dock / home-screen click.
 * Returns the next `menuFor` value (only menus change it).
 */
export function clickApp(
  id: AppId,
  menuFor: AppId | null,
  opts: { toggle?: boolean } = {}
): AppId | null {
  const meta = APP_META[id];
  if (meta.kind === AppKind.Menu) {
    const opening = menuFor !== id;
    if (opening) apps.bounceApp(id);
    return opening ? id : null;
  }
  if (opts.toggle) apps.toggleFromDock(id);
  else apps.openApp(id);
  return null;
}

export function pickMenuLink(href: string) {
  apps.openLink(href);
}
