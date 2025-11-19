import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function getApiKey({ container }: ExecArgs) {
  const apiKeyModuleService = container.resolve(Modules.API_KEY);

  const apiKeys = await apiKeyModuleService.listApiKeys({
    type: "publishable",
  });

  console.log("------------------------------------------------");
  console.log("PUBLISHABLE API KEYS:");
  apiKeys.forEach((key) => {
    console.log(`Title: ${key.title}`);
    console.log(`Token: ${key.token}`);
    console.log("------------------------------------------------");
  });
}
