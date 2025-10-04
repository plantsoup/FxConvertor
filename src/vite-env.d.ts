// Fix: Removed the problematic reference to 'vite/client' and defined the necessary types for `import.meta.env` manually.
// This resolves the type error without relying on a project-level configuration fix.

interface ImportMetaEnv {
    readonly VITE_API_KEY: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
