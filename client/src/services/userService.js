import http from "./httpService";
import { apiUrl } from "../config.json";

export function register(user) {
    const apiEndpoint = apiUrl + "/user";

    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: "TestUser",
        userSettings: {
            fastSMA: 10,
            slowSMA: 40,
            lookback: 1,
            fastWeight: 20,
            slowWeight: 20,
            fastToSlowWeight: 20,
            MACDWeight: 20,
            ADXWeight: 20
        }
    })
}

export async function getSettings(email) {
    const apiEndpoint = apiUrl + "/getUserSettings";
    const getUserSettings = await http.post(apiEndpoint, {email});

    if (getUserSettings.data.error) {
        return getUserSettings.data.error;
    } else {
        return getUserSettings.data;
    }
    
}

export function updateSettings(email, userSettings) {
    console.log(userSettings)
    const apiEndpoint = apiUrl + "/userSettings";
    
    return http.post(apiEndpoint, {email, userSettings});
}