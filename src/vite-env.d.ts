/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ABC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
