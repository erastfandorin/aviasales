import { toast } from "react-toastify";

const ticketsService = {
  URL: "https://front-test.beta.aviasales.ru",
  searchId: "",

  getSearchId: async function () {
    try {
      console.log(`${this.URL}/search`);
      const response = await fetch(`${this.URL}/search`);
      const parsedResponse = await response.json();
      this.searchId = parsedResponse.searchId;
    } catch (err) {
      toast.error("Some trouble on server, sorry(");
      throw err;
    }
  },
  getPackTickets: async function () {
    try {
      console.log(`${this.URL}/tickets?searchId=${this.searchId}`);
      const response = await fetch(
        `${this.URL}/tickets?searchId=${this.searchId}`
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
      await this.getSearchId();
      console.log("active?");
      do {
        response = await this.getPackTickets();
        ticketPack = [...ticketPack, ...response.tickets];
      } while (!response.stop);
      return ticketPack;
    } catch (err) {
      toast.error("Some trouble on server, sorry(");
      throw err;
    }
  },
};

export default ticketsService;
