import { toast } from "react-toastify";
import testData from "./testData.json";

const ticketsService = {
  URL: "https://front-test.beta.aviasales.ru",

  _getSearchId: async function () {
    try {
      const response = await fetch(`${this.URL}/search`);
      const { searchId } = await response.json();
      return searchId;
    } catch (err) {
      toast.error("Some trouble on server, sorry(");
      throw err;
    }
  },
  getPackTickets: async function (searchId) {
    try {
      const response = await fetch(
        `${this.URL}/tickets?searchId=${searchId}`
      );
      if (response.status === 200) {
        const parsedResponse = await response.json();
        return parsedResponse;
      }
      return { tickets: [], stop: false };
    } catch (err) {
      toast.error("Some trouble on server, sorry(");
      throw err;
    }
  },
  getAllTickets: async function () {
    try {
      let ticketPack = [];
      let response;
      const searchId = await this._getSearchId();
      do {
        response = await this.getPackTickets(searchId);
        ticketPack = [...ticketPack, ...response.tickets];
      } while (!response.stop);
      return ticketPack;
    } catch (err) {
      toast("🦄 So, we load test dates)");
      return testData;
    }
  },
};

export default ticketsService;


// interface ticket {
//     "price": number,
//     "carrier": "string",
//     "segments": [
//         {
//             "origin": "string",
//             "destination": "string",
//             "date": "string",
//             "stops": string[],
//             "duration": number
//         },
//         {
//             "origin": "string",
//             "destination": "string",
//             "date": "string",
//             "stops": string[],
//             "duration": number
//         }
//     ]
// }