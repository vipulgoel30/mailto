// ts-node ./env/generateEnv.ts --env=.env.dev --env-expand=.env
// ts-node ./env/generateEnv.ts --env=.env.prod --env-expand=.env

// Core imports
import { readFile, writeFile } from "fs/promises";

// User imports
import { StringArrObj, StringObj } from "@mono/utils";

const processCommandLineArgs = (): StringArrObj => {
  return process.argv.reduce<StringArrObj>((acc, arg: string) => {
    const splitAt: number = arg.indexOf("=");
    return { ...acc, ...(splitAt !== -1 && { [`${arg.slice(0, splitAt)}`]: arg.slice(splitAt + 1).split(",") }) };
  }, {});
};

let payload: StringObj = {};

const processFile = async (file: string, isExpand: boolean = false): Promise<void> => {
  try {
    const content = (await readFile(file, "utf-8")).trim();
    if (!content) return;

    payload = {
      ...payload,
      ...content.split("\n").reduce((acc: StringObj, env: string) => {
        if (!env.trim()) return acc;

        const splitAt: number = env.indexOf("=");
        if (splitAt === -1) throw new Error("Unexpected format. Expected ${KEY} = ${VALUE}");

        const key: string = env.slice(0, splitAt).trim();
        let value: string = env.slice(splitAt + 1).trim();
        if (isExpand) value = value.replace(new RegExp(/\${([\w]*)}/, "ig"), (match, group) => payload[group] ?? match);

        return { ...acc, [`${key}`]: value };
      }, {}),
    };
  } catch (err) {
    let message: string = "";
    if (err instanceof Error) {
      message = err.message;
      if (err.message.includes("ENOENT")) message = "Unable to locate file.";
    }

    console.log("\x1b[31m%s\x1b[0m", `Error in processing file : '${file}'. ${message}`);
  }
};

const processEnvTemplate = `
declare global {
  namespace NodeJS {
    interface ProcessEnv {
        [key: string]: string;
        {PLACEHOLDER}
    }
  }
}
export {};
`;
(async () => {
  const { ["--env"]: env, ["--env-expand"]: envExpand }: { ["--env"]?: string[]; ["--env-expand"]?: string[] } =
    processCommandLineArgs();
  env && (await Promise.all(env.map((file: string) => processFile(file))));
  envExpand && (await Promise.all(envExpand.map((file: string) => processFile(file, true))));

  // Creating .env file
  const envContent = Object.entries(payload)
    .map(([key, value]: [string, string]) => `${key}=${value}`)
    .join("\n");
  await writeFile(".env", envContent, "utf-8");

  // Creating process-env.d.ts file
  const processEnvContent: string = Object.keys(payload)
    .map((key: string) => `${key}: string`)
    .join("\n");
  await writeFile("./process-env.d.ts", processEnvTemplate.replace("{PLACEHOLDER}", processEnvContent), "utf-8");
})();
