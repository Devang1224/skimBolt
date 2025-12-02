import { safeJsonParse } from "../helpers/helpers";
import { userApi } from "../middleware";
import type { SummaryResponse } from "../types";

  



export const fetchSummary = async(
    textContent:string,
    url:string
  ):Promise<SummaryResponse>=>{
    try{
        const response = await userApi.post("/summary/generate-summary",{textContent,url});
        console.log("response from summary api: ",response);
        const aiText = response?.data?.aiResp?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiText) {
            console.error("Bad AI response structure:", response.data);
            throw new Error("Invalid AI response structure.");
          }
          const parsed = safeJsonParse<SummaryResponse>(aiText);
          if (!parsed.summary || !parsed.glossary || !parsed.metadata) {
            throw new Error("AI summary JSON missing required fields.");
          }
        return parsed;
    }catch(err){
        console.error("Error fetching summary:", err);
        throw new Error("Unable to fetch summary. Please try again.");
    }
}