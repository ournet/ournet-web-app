# ournet-web-app

Ournet web application:

- [www.ournet.ro](https://www.ournet.ro)
- [www.click.md](https://www.click.md)
- [www.our.bg](https://www.our.bg)
- [www.ournet.hu](https://www.ournet.hu)
- [www.ournet.cz](https://www.ournet.cz)
- [www.ournet.in](https://www.ournet.in)
- [www.ournet.it](https://www.ournet.it)
- [www.moti2.al](https://www.moti2.al)
- [www.hava.one](https://www.hava.one)
- [www.vremenska.rs](https://www.vremenska.rs)
- [www.meteo.ng](https://www.meteo.ng)
- [www.ournet.es](https://www.ournet.es)

```
certbot certonly --cert-name ournet-in --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d ournet.in -d *.ournet.in
```

```
certbot certonly --cert-name ournet-ro --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d ournet.ro -d *.ournet.ro
```

```
certbot certonly --cert-name click-md --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d click.md -d *.click.md
```

```
certbot certonly --cert-name ournet-hu --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d ournet.hu -d *.ournet.hu
```

```
certbot certonly --cert-name ournet-es --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d ournet.es -d *.ournet.es
```

```
certbot certonly --cert-name ournet --dns-route53 -m info@ournet-group.com --agree-tos --non-interactive --post-hook "sudo service nginx reload" -d meteo.ng -d www.meteo.ng -d vrijeme.one -d www.vrijeme.one -d vremenska.rs -d www.vremenska.rs -d meteo2.kz -d www.meteo2.kz -d moti2.al -d www.moti2.al -d hava.one -d www.hava.one -d ournet.it -d www.ournet.it -d news.ournet.it -d meteo.ournet.it -d oroscopo.ournet.it -d ournet.hu -d www.ournet.hu -d idojaras.ournet.hu -d horoszkop.ournet.hu -d ournet.cz -d www.ournet.cz -d pocasi.ournet.cz -d horoskop.ournet.cz -d news.ournet.cz -d ournet.in -d www.ournet.in -d news.ournet.in -d weather.ournet.in -d horoscope.ournet.in -d our.bg -d www.our.bg -d vremeto.our.bg -d news.our.bg -d horoscope.our.bg -d ournet.ro -d news.ournet.ro -d www.ournet.ro -d meteo.ournet.ro -d curs.ournet.ro -d horoscop.ournet.ro -d click.md -d news.click.md -d www.click.md -d meteo.click.md -d curs.click.md -d horoscop.click.md -d thoi.vn -d www.thoi.vn
```

```
certbot certonly --manual --preferred-challenges=dns --cert-name click-md -d click.md -d *.click.md
```

```
certbot certonly --manual --preferred-challenges=dns --cert-name ournet-ro -d ournet.ro -d *.ournet.ro
```

```
certbot certonly --manual --preferred-challenges=dns --cert-name ournet-hu -d ournet.hu -d *.ournet.hu
```

```
certbot certonly --manual --preferred-challenges=dns --cert-name ournet-es -d ournet.es -d *.ournet.es
```
