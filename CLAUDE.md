# Claude context

## Code auto-format

- Run `npx nx format:write`

## Adding new shadcn/ui component

- New shadcn/ui component is added with command: `npx shadcn@latest add --cwd packages/components <COMPONENT>`.
- Replace `import { cn } from "@components/ui/lib/utils"` with `import { cn } from "../../lib/utils";`.
- Exported in `packages\components\src\index.ts`.
- Auto-format the code.

## Adding new React component

- Register properties with `interface Props{}` if any
- Component has the following structure `export default function COMPONENT_NAME(props: Props)`

## Adding new library, class or functionality

- Do not create index.ts file that exports the new functionality
