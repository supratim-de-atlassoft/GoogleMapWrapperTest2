import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
// import pnp from "sp-pnp-js";
//import * as pnp from "sp-pnp-js";

//import { SPHttpClient, SPHttpClientResponse, SPHttpClientConfiguration } from '@microsoft/sp-http';

export class SPService {
    private locationListName = "Locations";
    private imageListName ="Location Photos";
    private docLibraryName ="Location Documents";
    private linksListName ="Location Links";

    

    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getListItem(rackID: any) {
        try {
            let response = await sp.web.lists.getByTitle(this.locationListName).items.filter("RackhouseID eq '" + rackID + "'").expand().get();
            return response;
        }
        catch (error) {
            return ("Item is not found");

        }
    }
    public async getImages(locID){
        try {
            let response = await sp.web.lists.getByTitle(this.imageListName).items.filter("LocationID eq '" + locID + "'").expand().select('Id,FileRef,ServerRedirectedEmbedUri,ServerRedirectedEmbedUrl,RackhouseID, LocationID').get();
            console.log(response);
            return response;
        }
        catch (error) {
            return ("Item is not found");

        }
    }

    public async getDocuments(locID){
        try {
            let response = await sp.web.lists.getByTitle(this.docLibraryName).items.filter("LocationID eq '" + locID + "'").select('Id,FileRef,ServerRedirectedEmbedUri,ServerRedirectedEmbedUrl,RackhouseID, LocationID').get();
            console.log(response);
            return response;
        }
        catch (error) {
            return ("Item is not found");

        }
    } 


    public async getLinks(locID){
        try {
            let response = await sp.web.lists.getByTitle(this.linksListName).items.filter("LocationID eq '" + locID + "'").expand().get();
            console.log(response);
            return response;
        }
        catch (error) {
            return ("Item is not found");

        }
    }

}