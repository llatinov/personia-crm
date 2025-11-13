# Personia CRM

This is monorepo for the Personia CRM project created and managed by Nx.

## Commands

`npm install` - install dependencies
`npx nx serve app` - run React app on <http://localhost:4200>
`npm run dev` - run all app in one command
`npm run lint` - lint all projects
`npm run test` - test all projects
`npx nx format:write` - auto-format files

## History

The monorepo was created mainly with the following commands:

- Add monorepo with (claude code, no CI provider, no remote cache) - `npx create-nx-workspace@latest personia-crm --preset=npm`
- Install react plugin - `nx add @nx/react`
- Add React frontend (no style format, routing, eslint, vitest, no E2E) - `nx g @nx/react:app packages/app --bundler=vite`
- [Setup Tailwind](https://tailwindcss.com/docs/installation/using-vite)
