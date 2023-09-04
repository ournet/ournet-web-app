import React = require("react");

const PRICES: Record<string, { price: number; currency: string }> = {
  ro: { price: 20, currency: "EUR" },
  md: { price: 10, currency: "EUR" }
};

export default (language: string, country: string) => {
  const price = PRICES[country];
  if (!price) return null;

  const activeLinkPrice =
    Math.floor(price.price / 5) < 2 ? 2 : Math.floor(price.price / 5);

  if (language === "ro") {
    return (
      <>
        <p>
          Vă invităm să plasați advertoriale pe site-ul nostru. Articolele
          trebuisă să îndeplinească câteva reguli simple.
        </p>
        <h4>Reguli plasare advertorial</h4>
        <ul>
          <li>
            Agentul publicitar este singurul responsabil pentru conținutul
            materialelor și conformitatea acestora cu cerințele legii.
          </li>
          <li>
            Articolul trebuie să fie în format știre. Redacția își rezervă
            dreptul de a respinge articolele care nu respectă politica
            editorială.
          </li>
          <li>
            Articolul trebuie să fie scris în limba română și să nu conțină
            greșeli gramaticale. Titlul va conține: <strong>Ⓟ</strong> la sfârșit.
          </li>
          <li>
            Elemente obligatorii: titlu (scurt și clar), text, o imagine (minim
            800x600px). Articolul nu poate conține mai mult de 3 linkuri, 10
            imagini și 2 video. Video-urile sunt găzduite pe YouTube sau alte
            platforme similare.
          </li>
          <li>
            Redacția va primi articolul pe email în format document, sau link la
            articolul publicat pe alte site-uri.
          </li>
        </ul>
        <h4>Prețuri</h4>
        <p>
          Articolul se plasează pentru timp nelimitat. Prețurile sunt în{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Preț articol:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Preț per link activ(dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Exemplu: Plasare articol cu 2 linkuri active(dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Contact</h4>
        <p>
          Pentru a plasa un articol publicitar, vă rugăm să ne contactați pe
          email: <a href="mailto:info@urnet-group.com">info@urnet-group.com</a>.
        </p>
        <p>
          La moment, plățile se fac doar prin PayPal. Vă vom trimite factura
          pentru plata serviciilor.
        </p>
      </>
    );
  }

  return null;
};
