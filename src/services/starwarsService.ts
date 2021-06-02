import urljoin from "url-join";

class StarWarsService {
  private static readonly STAR_WARS_SERVICE_ADDR = "https://swapi.dev/api/";
  private static readonly VEHICLES = "vehicles";
  private static readonly PAGE_PARAM = "page";
  private static readonly SEARCH_PARAM = "search";
  private static readonly ARTIFICIAL_DELAY_IN_MS = 0;

  public async getVehicles(
    requestedPage: number,
    searchTerm?: string
  ): Promise<any> {
    const urlStart =
      urljoin(
        StarWarsService.STAR_WARS_SERVICE_ADDR,
        StarWarsService.VEHICLES
      ) +
      "/?" +
      StarWarsService.PAGE_PARAM +
      "=" +
      (requestedPage + 1);

    const url = searchTerm
      ? urlStart + "&" + StarWarsService.SEARCH_PARAM + "=" + searchTerm
      : urlStart;

    console.log("URL:", url);

    return await new Promise((resolve) =>
      setTimeout(resolve, StarWarsService.ARTIFICIAL_DELAY_IN_MS)
    ).then(() =>
      fetch(url).then((response: Response) => {
        console.log("response", response);
        const json = response.json();
        console.log("json", json);
        return json;
      })
    );
  }
}

export default StarWarsService;
