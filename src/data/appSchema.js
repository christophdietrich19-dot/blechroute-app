export const APP_DATA_SCHEMA_VERSION = 1;
export const LOCAL_USER_ID = "user-christoph";

const COLLECTIONS = [
  "communityUsers",
  "followingHandles",
  "followingVehicleIds",
  "blockedProfiles",
  "reports",
  "reposts",
  "likedEntryIds",
  "savedEntryIds",
  "notifications",
  "conversations",
  "vehicles",
  "entries",
  "spots",
  "polaroids"
];

export function normalizeAppState(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  if (!value.user || typeof value.user !== "object" || Array.isArray(value.user)) return null;

  const state = { ...value };
  state.user = { ...value.user, id: value.user.id || LOCAL_USER_ID };
  for (const collection of COLLECTIONS) {
    state[collection] = Array.isArray(value[collection]) ? value[collection] : [];
  }
  state.entries = state.entries.map((entry) =>
    entry.author && !entry.author.id && entry.author.handle === state.user.handle
      ? { ...entry, author: { ...entry.author, id: state.user.id } }
      : entry
  );
  return state;
}

export function isOwnAuthor(author, user) {
  if (!author) return true;
  if (author.id && user?.id) return author.id === user.id;
  return Boolean(author.handle && author.handle === user?.handle);
}

export function isEntryVisible(entry, user, blockedProfiles = []) {
  if (isOwnAuthor(entry.author, user)) return true;
  return !blockedProfiles.some((profile) => profile.key === `handle:${entry.author?.handle}`);
}
