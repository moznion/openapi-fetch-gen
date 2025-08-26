#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { Command } from "commander";
import { version } from "../package.json";
import { generateClient } from "./index";

const program = new Command();

program
  .name("openapi-fetch-gen")
  .description(
    "Generate TypeScript API client from OpenAPI TypeScript definitions",
  )
  .version(version)
  .requiredOption(
    "-i, --input <path>",
    "path to input OpenAPI TypeScript definition file",
  )
  .option(
    "-o, --output <path>",
    "path to output generated client file",
    "./client.ts",
  )
  .option(
    "--use-operation-id",
    "use operationId from OpenAPI schema for method names instead of generating from path",
    false,
  )
  .option(
    "--parse-as-mapping <json-string>",
    "a mapping of response content types to their corresponding `parseAs` fetch options in the openapi-ts library",
    "{}",
  )
  .parse(process.argv);

const options = program.opts();

try {
  const start = Date.now() / 1000.0;

  const inputPath = path.resolve(options["input"]);
  const outputPath = path.resolve(options["output"]);
  const useOperationId = options["useOperationId"] || false;
  const parseAsMapping = JSON.parse(options["parseAsMapping"]) || {};

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const clientCode = generateClient(inputPath, {
    useOperationId,
    parseAsMapping,
  });

  fs.writeFileSync(outputPath, clientCode);

  const end = Date.now() / 1000.0;

  console.log(
    `🏁 Successfully generated client at [${(end - start).toFixed(2)}ms]: ${outputPath}`,
  );
} catch (error) {
  console.error(
    "😵 Error:",
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
}
