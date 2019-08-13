export function dateFormat(aika) {
  const week = [
    "sunnuntai",
    "maanantai",
    "tiistai",
    "keskiviikko",
    "torstai",
    "perjantai",
    "lauantai"
  ];
  var aika = new Date(aika);

  var vko_paiva = aika.getDay();
  if (!vko_paiva) return false;
  var paiva = aika.getDate();
  var kuukausi = aika.getMonth() + 1;
  var vuosi = aika.getFullYear();
  var tunnit = aika.getHours();
  var minuutit = aika.getMinutes();
  var sekunnit = aika.getSeconds();
  if (tunnit.toString().length == 1) {
    tunnit = "0" + tunnit;
  }
  if (minuutit.toString().length == 1) {
    minuutit = "0" + minuutit;
  }
  var str = `${
    week[vko_paiva]
  } ${paiva}.${kuukausi}.${vuosi}, kello: ${tunnit}:${minuutit}`;
  return str;
}
