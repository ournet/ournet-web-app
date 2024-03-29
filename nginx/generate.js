const { readFile, writeFile } = require("fs/promises");
const { join } = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));

const uniq = (arr) => [...new Set(arr)];

const getAllHosts = async () => {
  const files = await glob(join(__dirname, "../config/**/*.json"));
  return uniq(files.map((file) => require(file).host))
    .sort()
    .filter((it) =>
      [".ournet.ee", ".ournet.pl", ".meteo2.lv"].every((d) => !it.endsWith(d))
    );
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
  const domains = uniq(hosts.map((host) => host.replace(/^\w+\./, "")));
  const all = uniq(domains.concat(domains.map((d) => `*.${d}`)));
  const output = `# Ournet nginx config

## SSL

\`\`\`bash
certbot certonly --cert-name ournet --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d ${all.join(
    " -d "
  )}
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
