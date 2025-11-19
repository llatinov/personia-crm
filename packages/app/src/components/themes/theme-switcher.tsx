import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui";
import { Theme, useTheme } from "app/components/themes/theme-provider";
import { Moon, MoonStar, Sun, SunSnow } from "lucide-react";
import "./index.css";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case Theme.LIGHT:
        return <Sun className="h-5 w-5" />;
      case Theme.LIGHT_CUSTOM:
        return <SunSnow className="h-5 w-5" />;
      case Theme.DARK:
        return <Moon className="h-5 w-5" />;
      case Theme.DARK_CUSTOM:
        return <MoonStar className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT_CUSTOM)}>
          <SunSnow className="mr-2 h-4 w-4" />
          <span>Light *</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK_CUSTOM)}>
          <MoonStar className="mr-2 h-4 w-4" />
          <span>Dark *</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
