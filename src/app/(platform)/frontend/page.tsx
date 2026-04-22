import ModuleWorkspace from "@/components/modules/module-workspace";
import { frontendModule } from "@/data/frontend";

export default function FrontendPage() {
  return <ModuleWorkspace module={frontendModule} />;
}
