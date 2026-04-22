import ModuleWorkspace from "@/components/modules/module-workspace";
import { backendModule } from "@/data/backend";

export default function BackendPage() {
  return <ModuleWorkspace module={backendModule} />;
}
