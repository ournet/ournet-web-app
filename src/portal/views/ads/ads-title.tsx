export default (language: string) => {
  if (language === "ro") return "Plasare articol publicitar Ⓟ";
  if (language === "en") return "Advertising articles Ⓟ";
  if (language === "ru") return "Размещение рекламных статей Ⓟ";
  if (language === "bg") return "Публикуване на рекламни статии Ⓟ";
  if (language === "hu") return "Hirdetési cikkek közzététele Ⓟ";
  if (language === "cs") return "Zveřejnění reklamních článků Ⓟ";
  if (language === "es") return "Publicación de artículos publicitarios Ⓟ";

  return null;
};
