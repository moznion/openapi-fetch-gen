import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateClient } from "./index";

describe("generateClient", () => {
  it("generates an operation id method for the Xquik search endpoint", () => {
    const workDir = mkdtempSync(path.join(tmpdir(), "openapi-fetch-gen-"));
    const schemaPath = path.join(workDir, "xquik-schema.d.ts");

    writeFileSync(
      schemaPath,
      `export interface paths {
  "/api/v1/x/tweets/search": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: operations["searchTweets"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}

export interface components {
  schemas: {
    SearchTweetsResponse: {
      data: unknown[];
    };
  };
}

export interface operations {
  searchTweets: {
    parameters: {
      query: {
        q: string;
        queryType?: "Latest" | "Top";
        limit?: number;
      };
      header: {
        "x-api-key"?: string;
        "Xquik-Api-Key"?: string;
      };
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["SearchTweetsResponse"];
        };
      };
    };
  };
}
`,
    );

    const client = generateClient(schemaPath, { useOperationId: true });

    expect(client).toContain("async searchTweets(");
    expect(client).toContain('this.client.GET("/api/v1/x/tweets/search"');
    expect(client).toContain('queryType?: "Latest" | "Top"');
    expect(client).toContain('"x-api-key"?: string');
  });
});
