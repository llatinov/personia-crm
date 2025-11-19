# Personia CRM

This is monorepo for the Personia CRM project created and managed by Nx.

## Commands

`npm install` - install dependencies
`npx nx serve app` - run React app on <http://localhost:4200>
`npm run dev` - run all app in one command
`npm run lint` - lint all projects
`npm run test` - test all projects
`npx nx format:write` - auto-format files
`npm run cap:run:android` - build and deploy on Android emulator

## How to

Package resolution is configured in `paths` in tsconfig.base.json and then resolved by `nxViteTsPaths` in vite.config.ts.

## History

The monorepo was created mainly with the following commands:

- Add monorepo with (claude code, no CI provider, no remote cache) - `npx create-nx-workspace@latest personia-crm --preset=npm`
- Install react plugin - `nx add @nx/react`
- Add React frontend (no style format, routing, eslint, vitest, no E2E) - `nx g @nx/react:app packages/app --bundler=vite`
- [Setup Tailwind](https://tailwindcss.com/docs/installation/using-vite)
- Add shadcn/ui, more info [here](https://pustelto.com/blog/adding-shadcnui-to-nx-monorepo/)
  - Add separate components library - `nx g @nx/react:library packages/components --bundler=vite` (no test)
  - Install and configure [Vite and Tailwind](https://tailwindcss.com/docs/installation/using-vite) in components library - `cd packages/components && npm install tailwindcss @tailwindcss/vite --save && cd ../..` (workaround for not possible to have shadcn/ui + Vite + Tailwind 4 + NX)
  - Init shadcn/ui - `npx shadcn@latest init --cwd packages/components`
  - Add component - `npx shadcn@latest add --cwd packages/components button`
- [Install Capacitor](https://capacitorjs.com/docs/getting-started), add Android and move to `packages` folder, [install plugins](https://capacitorjs.com/docs/apis)
