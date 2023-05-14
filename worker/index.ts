import handleRequest from "~/app/server";

export default {
  async fetch(request: Request) {
    try {
      const res = await handleRequest(request, 200, {} as Headers);
      return res;
    } catch (error) {
      return new Response("Server Error", { status: 500 });
    }
  },
};
