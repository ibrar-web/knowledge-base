import CommandsLibrary from "@/components/modules/commands-library";
import { commandLibrary } from "@/data/commands";

export default function CommandsPage() {
  return <CommandsLibrary commands={commandLibrary} />;
}
