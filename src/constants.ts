// This API key is for demonstration purposes.
// In a production environment, this should be replaced with an environment variable.
export const API_URL = 'https://swop.dev/graphql';

// This will be replaced by Vite during the build process with the value
// of the VITE_API_KEY environment variable.
// Make sure to set this variable in your Cloudflare Pages environment.
// It MUST be prefixed with VITE_ to be exposed to the client.
export const API_KEY = import.meta.env.VITE_API_KEY;
