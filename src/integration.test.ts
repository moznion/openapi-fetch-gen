import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

describe("integration test", () => {
  beforeAll(() => {
    execSync("pnpm generate_test_resource", { stdio: "inherit" });
    execSync("pnpm fix", { stdio: "inherit" });
    execSync("pnpm build", { stdio: "inherit" });
  });

  it("should generate client code correctly", () => {
    execSync(
      "node ./dist/cli.js --input ./src/test_resources/schema.d.ts --output ./src/test_resources/generated_client.ts",
      { stdio: "inherit" },
    );
    execSync("pnpm build", { stdio: "inherit" });

    const generatedPath = path.resolve(
      "./src/test_resources/generated_client.ts",
    );
    const expectedPath = path.resolve(
      "./src/test_resources/expected_client.ts",
    );

    const generatedContent = fs.readFileSync(generatedPath, "utf8");
    const expectedContent = fs.readFileSync(expectedPath, "utf8");

    expect(generatedContent).toBe(expectedContent);
  }, 30000);

  it("should generate client code correctly", () => {
    execSync(
      `node ./dist/cli.js --input ./src/test_resources/schema.d.ts --output ./src/test_resources/generated_client.ts --use-operation-id --parse-as-mapping '{"application/json": "blob"}'`,
      { stdio: "inherit" },
    );
    execSync("pnpm build", { stdio: "inherit" });

    const generatedPath = path.resolve(
      "./src/test_resources/generated_client.ts",
    );
    const expectedPath = path.resolve(
      "./src/test_resources/expected_client_with_options.ts",
    );

    const generatedContent = fs.readFileSync(generatedPath, "utf8");
    const expectedContent = fs.readFileSync(expectedPath, "utf8");

    expect(generatedContent).toBe(expectedContent);
  }, 30000);
});
