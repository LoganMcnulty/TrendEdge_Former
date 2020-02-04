import http from "./httpService";
import { apiUrl } from "../config.json";
import sectorData from "../model/testSector.json"

export function createSectors() {

    const apiEndpoint = apiUrl + "/createSectors";
    const mainSectors = [];

    for (let i = 0; i < sectorData.length; i++){
        let sectorInfo = {
            indexName: sectorData[i].Stock,
            sectorName: sectorData[i].Company
        }  
        mainSectors.push(sectorInfo)
    }
    return http.post(apiEndpoint, {mainSectors})
}