function randomStr(): string {
  return Math.random().toString(16).substring(2);
}

export const SHARED_STORE_CONTEXT_KEY =
  'shared_store_context_key_' + randomStr();
