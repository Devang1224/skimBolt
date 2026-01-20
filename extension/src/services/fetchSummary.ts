import { safeJsonParse } from "../helpers/helpers";
import { userApi } from "../middleware";
import type { Settings, SummaryResponse } from "../types";
 
  



export const fetchSummary = async(
    textContent:string,
    url:string,
    settings:Settings
  ):Promise<SummaryResponse>=>{
    try{
        const response = await userApi.post("/summary/generate-summary",{textContent,url,settings});
        console.log("response from summary api: ",response);

        const aiText = response?.data?.aiResp;
         console.log("AI MODEL RESPONSE _____________: ",aiText);

        if (!aiText) {
            console.error("Bad AI response structure:", response.data);
            throw new Error("Invalid AI response structure.");
          }
          const parsed = safeJsonParse<SummaryResponse>(aiText);
          if (!parsed.summary || !parsed.glossary) {
            throw new Error("AI summary JSON missing required fields.");
          }
          console.log("PARSED JSON: ",parsed);
        return parsed;
    }catch(err){
        console.error("Error fetching summary:", err);
        throw new Error("Unable to fetch summary. Please try again.");
    }
}