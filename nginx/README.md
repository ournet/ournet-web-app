# Ournet nginx config

## SSL

```bash
certbot certonly --cert-name ournet --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d click.md -d ournet.ro -d our.bg -d ournet.in -d ournet.cz -d ournet.hu -d ournet.it -d ournet.es -d hava.one -d meteo.ng -d moti2.al -d thoi.vn -d vremenska.rs -d vrijeme.one -d *.click.md -d *.ournet.ro -d *.our.bg -d *.ournet.in -d *.ournet.cz -d *.ournet.hu -d *.ournet.it -d *.ournet.es -d *.hava.one -d *.meteo.ng -d *.moti2.al -d *.thoi.vn -d *.vremenska.rs -d *.vrijeme.one
```
