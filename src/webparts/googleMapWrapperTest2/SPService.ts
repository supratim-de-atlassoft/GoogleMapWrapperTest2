import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
// import pnp from "sp-pnp-js";
//import * as pnp from "sp-pnp-js";

//import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

export class SPService {
    private listName = "Locations";

    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getListItem(rackID: any) {
        try {
            let response = await sp.web.lists.getByTitle(this.listName).items.filter("RackhouseID eq '" + rackID + "'").expand().get();
            return response;
        }
        catch (error) {
            return ("Item is not found");

        }
    }


}