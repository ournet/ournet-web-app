const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));

const uniq = (arr) => [...new Set(arr)];

const getAllHosts = async () => {
  const files = await glob(join(__dirname, "../config/**/*.json"));
  return uniq(files.map((file) => require(file).host)).sort();
};

const generateConfig = async (hosts) => {
  const template = join(__dirname, "ournet.conf.template");
  const output = join(__dirname, "ournet.conf");
  const domains = uniq(hosts.map((host) => host.replace(/^\w+\./, "")));
  let conf = await readFile(template, "utf8");
  conf = conf.replace("ALL_HOSTS", hosts.join(" "));
  conf = conf.replace("ALL_DOMAINS", domains.join(" "));
  conf = conf.replace(
    "ALL_80",
    domains
      .map((d) => [d, `*.${d}`])
      .flat()
      .join(" ")
  );
  await writeFile(output, conf);
};

const generateReadme = async (hosts) => {
  hosts = [...hosts, "curs.click.md", "curs.ournet.ro"];
  const output = `# Ournet nginx config

## SSL

\`\`\`bash
certbot certonly --nginx --cert-name ournet -d ${hosts.join(" -d ")} --email info@ournet-group.com
\`\`\`
`;
  await writeFile(join(__dirname, "README.md"), output);
};

async function generate() {
  const hosts = await getAllHosts();
  await generateConfig(hosts);
  await generateReadme(hosts);
}

generate().then(() => console.log("Done"), console.error);
