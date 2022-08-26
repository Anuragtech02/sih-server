import axios from "axios";
import xml2js from "xml2js";
import some from "rss-to-json";

function pibDetail() {}
export const pibs = {
  mumbai: "1",
  delhi: "3",
  hyderabad: "5",
  chennai: "6",
  chandigarh: "17",
  kolkata: "19",
  bengaluru: "20",
  bhubaneswar: "21",
  ahmamadabad: "22",
  guwahati: "23",
  thiruvanantpuram: "24",
};

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

// getRealease();
