import { aiModule } from "@/data/aiQuestions";
import { backendModule } from "@/data/backendQuestions";
import { cloudModule, devopsModule } from "@/data/cloudDevops";
import { frontendModule } from "@/data/frontendQuestions";
import { gitModule } from "@/data/gitQuestions";
import { systemDesignModule } from "@/data/systemDesign";

export const modules = [
  frontendModule,
  backendModule,
  cloudModule,
  devopsModule,
  aiModule,
  gitModule,
  systemDesignModule,
];

export const modulesByKey = Object.fromEntries(
  modules.map((module) => [module.key, module]),
);
