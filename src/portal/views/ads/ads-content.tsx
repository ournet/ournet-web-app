import React = require("react");

const PRICES: Record<string, { price: number; currency: string }> = {
  ro: { price: 20, currency: "EUR" },
  md: { price: 10, currency: "EUR" },
  in: { price: 10, currency: "USD" },
  bg: { price: 20, currency: "EUR" },
  hu: { price: 20, currency: "EUR" },
  cz: { price: 20, currency: "EUR" },
  es: { price: 20, currency: "EUR" },
  it: { price: 20, currency: "EUR" },
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
            greșeli gramaticale. Titlul va conține: <strong>Ⓟ</strong> la
            sfârșit.
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
          email: <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          La moment, plățile se fac doar prin PayPal. Vă vom trimite factura
          pentru plata serviciilor.
        </p>
      </>
    );
  }
  if (language === "en") {
    return (
      <>
        <p>
          We invite you to place advertorials on our website. Articles must
          adhere to some simple rules.
        </p>
        <h4>Rules for Placing Advertorials</h4>
        <ul>
          <li>
            The advertising agent is solely responsible for the content of the
            materials and their compliance with legal requirements.
          </li>
          <li>
            The article must be in news format. The editorial team reserves the
            right to reject articles that do not comply with the editorial
            policy.
          </li>
          <li>
            The article must be written in English and must not contain
            grammatical errors. The title should include: <strong>Ⓟ</strong> at
            the end.
          </li>
          <li>
            Mandatory elements: title (short and clear), text, one image
            (minimum 800x600px). The article cannot contain more than 3 links,
            10 images, and 2 videos. Videos should be hosted on YouTube or
            similar platforms.
          </li>
          <li>
            The editorial team will receive the article via email in document
            format or a link to the article published on other websites.
          </li>
        </ul>
        <h4>Prices</h4>
        <p>
          The article is placed for an unlimited time. Prices are in{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Article price:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Price per active link (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Example: Placement of an article with 2 active links (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Contact</h4>
        <p>
          To place an advertising article, please contact us via email:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          Currently, payments are only accepted through PayPal. We will send you
          an invoice for the payment of services.
        </p>
      </>
    );
  }
  if (language === "ru") {
    return (
      <>
        <p>
          Приглашаем вас разместить рекламные статьи на нашем веб-сайте. Статьи
          должны соответствовать нескольким простым правилам.
        </p>
        <h4>Правила размещения рекламных статей</h4>
        <ul>
          <li>
            Рекламное агентство несет единоличную ответственность за содержание
            материалов и их соответствие требованиям закона.
          </li>
          <li>
            Статья должна быть в формате новостей. Редакция оставляет за собой
            право отклонить статьи, не соответствующие редакторской политике.
          </li>
          <li>
            Статья должна быть написана на русском языке и не должна содержать
            грамматических ошибок. В заголовке должен быть символ:{" "}
            <strong>Ⓟ</strong>в конце.
          </li>
          <li>
            Обязательные элементы: заголовок (краткий и ясный), текст, одно
            изображение (минимум 800x600 пикселей). Статья не может содержать
            более 3 ссылок, 10 изображений и 2 видео. Видео размещаются на
            YouTube или подобных платформах.
          </li>
          <li>
            Редакция получит статью по электронной почте в формате документа или
            ссылку на статью, опубликованную на других веб-сайтах.
          </li>
        </ul>
        <h4>Цены</h4>
        <p>
          Статья размещается на неограниченный срок. Цены указаны в валюте{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Стоимость статьи:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Стоимость активной ссылки (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Пример: Размещение статьи с 2 активными ссылками (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Контакт</h4>
        <p>
          Для размещения рекламной статьи, пожалуйста, свяжитесь с нами по
          адресу электронной почты:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          В настоящее время оплаты принимаются только через PayPal. Мы вышлем
          вам счет за оплату услуг.
        </p>
      </>
    );
  }
  if (language === "bg") {
    return (
      <>
        <p>
          Поканваме ви да поставите рекламни статии на нашия уебсайт. Статиите
          трябва да спазват няколко прости правила.
        </p>
        <h4>Правила за поставяне на рекламни статии</h4>
        <ul>
          <li>
            Рекламният агент е единствено отговорен за съдържанието на
            материалите и тяхното съответствие с изискванията на закона.
          </li>
          <li>
            Статията трябва да бъде в новинарски формат. Редакцията запазва
            правото да отхвърли статии, които не спазват редакторската политика.
          </li>
          <li>
            Статията трябва да бъде написана на български език и да не съдържа
            граматически грешки. Заглавието трябва да съдържа:{" "}
            <strong>Ⓟ</strong> в края.
          </li>
          <li>
            Задължителни елементи: заглавие (кратко и ясно), текст, една снимка
            (минимум 800x600px). Статията не може да съдържа повече от 3 връзки,
            10 снимки и 2 видеоклипа. Видеоклиповете трябва да бъдат разположени
            на YouTube или други подобни платформи.
          </li>
          <li>
            Редакцията ще получи статията по имейл във формат на документ или
            връзка към статия, публикувана на други уебсайтове.
          </li>
        </ul>
        <h4>Цени</h4>
        <p>
          Статията се публикува за неограничен период. Цените са в{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Цена на статията:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Цена за активна връзка (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Пример: Поставяне на статия с 2 активни връзки (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Контакт</h4>
        <p>
          За да поставите рекламна статия, моля, свържете се с нас на имейл:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          В момента плащанията се приемат само чрез PayPal. Ще ви изпратим
          фактура за плащане на услугите.
        </p>
      </>
    );
  }
  if (language === "hu") {
    return (
      <>
        <p>
          Meghívjuk Önt, hogy helyezzen el hirdetéseket weboldalunkon. A
          cikkeknek néhány egyszerű szabálynak kell megfelelniük.
        </p>
        <h4>Elhelyezési szabályok</h4>
        <ul>
          <li>
            A hirdető ügynök kizárólagos felelősséggel tartozik a tartalomért és
            annak összhangjáért a törvényi előírásokkal.
          </li>
          <li>
            A cikknek hírformátumban kell lennie. A szerkesztőség fenntartja
            magának a jogot, hogy elutasítsa azokat a cikkeket, amelyek nem
            felelnek meg a szerkesztési irányelvnek.
          </li>
          <li>
            A cikket magyar nyelven kell írni, és nem tartalmazhat nyelvtani
            hibákat. A cím végén legyen: <strong>Ⓟ</strong>.
          </li>
          <li>
            Kötelező elemek: cím (rövid és világos), szöveg, egy kép (legalább
            800x600px). A cikk nem tartalmazhat háromnál több hivatkozást,
            tíznél több képet és két videót. A videók YouTube-on vagy hasonló
            platformokon találhatók.
          </li>
          <li>
            A szerkesztőség e-mailben fogadja a cikket dokumentum formátumban
            vagy hivatkozást más weboldalakon közzétett cikkekre.
          </li>
        </ul>
        <h4>Árak</h4>
        <p>
          A cikk határozatlan ideig kerül közzétételre. Az árak a következők:{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Cikk ára:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Aktív hivatkozás ára (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Példa: Cikk elhelyezése 2 aktív hivatkozással (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Kapcsolat</h4>
        <p>
          Hirdetési cikk elhelyezéséhez kérjük, lépjen kapcsolatba velünk az
          alábbi e-mail címen:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          Jelenleg csak PayPal-on keresztül fogadjuk el a fizetéseket. Elküldjük
          Önnek a szolgáltatások díjának számláját.
        </p>
      </>
    );
  }
  if (language === "cs") {
    return (
      <>
        <p>
          Zveme vás k umístění reklamních článků na našem webu. Články musí
          splňovat několik jednoduchých pravidel.
        </p>
        <h4>Pravidla umístění reklamního článku</h4>
        <ul>
          <li>
            Reklamní agent je jedině zodpovědný za obsah materiálů a jejich
            soulad s právními požadavky.
          </li>
          <li>
            Článek musí být v novinovém formátu. Redakce si vyhrazuje právo
            odmítnout články, které neodpovídají redakční politice.
          </li>
          <li>
            Článek musí být psán v češtině a nesmí obsahovat gramatické chyby.
            Název bude obsahovat: <strong>Ⓟ</strong> na konci.
          </li>
          <li>
            Povinné prvky: název (krátký a jasný), text, jedna fotografie
            (minimálně 800x600px). Článek nesmí obsahovat více než 3 odkazy, 10
            obrázků a 2 videa. Videa jsou hostována na YouTube nebo jiných
            podobných platformách.
          </li>
          <li>
            Redakce obdrží článek e-mailem ve formátu dokumentu nebo odkaz na
            článek publikovaný na jiných webových stránkách.
          </li>
        </ul>
        <h4>Ceny</h4>
        <p>
          Článek se umisťuje na neomezenou dobu. Ceny jsou v měně{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Cena článku:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Cena za aktivní odkaz (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Příklad: Umístění článku s 2 aktivními odkazy (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Kontakt</h4>
        <p>
          Pro umístění reklamního článku nás prosím kontaktujte e-mailem na
          adrese: <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>
          .
        </p>
        <p>
          V současné době přijímáme platby pouze přes PayPal. Pošleme vám
          fakturu k úhradě služeb.
        </p>
      </>
    );
  }
  if (language === "es") {
    return (
      <>
        <p>
          Le invitamos a colocar artículos publicitarios en nuestro sitio web.
          Los artículos deben cumplir con algunas reglas simples.
        </p>
        <h4>Reglas para la Colocación de Artículos Publicitarios</h4>
        <ul>
          <li>
            El agente publicitario es el único responsable del contenido de los
            materiales y de su conformidad con los requisitos legales.
          </li>
          <li>
            El artículo debe estar en formato de noticias. La redacción se
            reserva el derecho de rechazar los artículos que no cumplan con la
            política editorial.
          </li>
          <li>
            El artículo debe estar escrito en español y no debe contener errores
            gramaticales. El título debe incluir: <strong>Ⓟ</strong> al final.
          </li>
          <li>
            Elementos obligatorios: título (corto y claro), texto, una imagen
            (mínimo 800x600px). El artículo no puede contener más de 3 enlaces,
            10 imágenes y 2 videos. Los videos deben estar alojados en YouTube u
            otras plataformas similares.
          </li>
          <li>
            La redacción recibirá el artículo por correo electrónico en formato
            de documento o un enlace al artículo publicado en otros sitios web.
          </li>
        </ul>
        <h4>Precios</h4>
        <p>
          El artículo se coloca por tiempo indefinido. Los precios están en{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Precio del artículo:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Precio por enlace activo (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Ejemplo: Colocación de un artículo con 2 enlaces activos (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Contacto</h4>
        <p>
          Para colocar un artículo publicitario, por favor contáctenos por
          correo electrónico:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          Actualmente, solo aceptamos pagos a través de PayPal. Le enviaremos la
          factura para el pago de los servicios.
        </p>
      </>
    );
  }
  if (language === "it") {
    return (
      <>
        <p>
          Vi invitiamo a pubblicare articoli pubblicitari sul nostro sito. Gli
          articoli devono rispettare alcune semplici regole.
        </p>
        <h4>Regole per la Pubblicazione degli Articoli Pubblicitari</h4>
        <ul>
          <li>
            L'agente pubblicitario è l'unico responsabile del contenuto dei
            materiali e della loro conformità alle leggi vigenti.
          </li>
          <li>
            L'articolo deve essere in formato notizia. La redazione si riserva
            il diritto di respingere gli articoli che non rispettano la politica
            editoriale.
          </li>
          <li>
            L'articolo deve essere scritto in lingua italiana e non deve
            contenere errori grammaticali. Il titolo deve contenere:{" "}
            <strong>Ⓟ</strong> alla fine.
          </li>
          <li>
            Elementi obbligatori: titolo (breve e chiaro), testo, un'immagine
            (minimo 800x600px). L'articolo non può contenere più di 3 link, 10
            immagini e 2 video. I video devono essere ospitati su YouTube o
            altre piattaforme simili.
          </li>
          <li>
            La redazione riceverà l'articolo via email in formato documento o un
            link all'articolo pubblicato su altri siti web.
          </li>
        </ul>
        <h4>Prezzi</h4>
        <p>
          L'articolo viene pubblicato per un tempo illimitato. I prezzi sono in{" "}
          {price.currency}.
        </p>
        <ul>
          <li>
            Prezzo dell'articolo:{" "}
            <strong>
              {price.price}
              {price.currency}
            </strong>
          </li>
          <li>
            Prezzo per link attivo (dofollow):{" "}
            <strong>
              {activeLinkPrice}
              {price.currency}
            </strong>
          </li>
        </ul>
        <p>
          Esempio: Pubblicazione di un articolo con 2 link attivi (dofollow):{" "}
          <code>
            {price.price} + {activeLinkPrice} * 2 ={" "}
            {price.price + activeLinkPrice * 2}
            {price.currency}
          </code>
          .
        </p>
        <h4>Contatto</h4>
        <p>
          Per pubblicare un articolo pubblicitario, vi preghiamo di contattarci
          via email:{" "}
          <a href="mailto:info@ournet-group.com">info@ournet-group.com</a>.
        </p>
        <p>
          Al momento, accettiamo solo pagamenti tramite PayPal. Vi invieremo la
          fattura per il pagamento dei servizi.
        </p>
      </>
    );
  }

  return null;
};
