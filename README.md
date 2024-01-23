# Mindplug
This is the frontend dashboard of [Mindplug](https://www.mindplug.io/) where users can upload and manage data from multiple sources. It implements the Mindplug JS SDK to communicate with the mindplug [backend
](https://github.com/AmritpalChera/mindplug_api). 


## Getting Started
Install dependencies
```
yarn install
```

Configure the .env variables as outlined in the sample env.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Services
Users can seperate out vectors into different projects and collections.
![image](https://github.com/AmritpalChera/mindfront/assets/52187061/374639e7-e07d-4a7a-a458-a9126ca50027)

Users may query for a specific vector through the built-in search. The search returns the top 3 matches to any given search. The users may edit and update the vectors at any given time. This provides an easier debug solution to ensure a high quality for returned results.
![image](https://github.com/AmritpalChera/mindfront/assets/52187061/46630558-a147-4deb-862d-f0962ecc6a46)

Users can upload data in multiple formats including simple text, pdf, webpage url, and audio.
![image](https://github.com/AmritpalChera/mindfront/assets/52187061/3d618bb4-c0b8-4411-959d-25d2fa6608e2)
