import axios from "axios";
import xml2js from "xml2js";
import some from "rss-to-json";

const { parse } = some;
async function getRealease() {
  const res = await parse(
    "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3"
  );
  const data = JSON.parse(JSON.stringify(res, null, 3));
  console.log(data.items[0].link);
  const response = await axios.get(data.items[0].link);
  console.log(response.data);
}

getRealease();
