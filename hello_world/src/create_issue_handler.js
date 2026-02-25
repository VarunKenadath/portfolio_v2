// index.js
import api, { route } from '@forge/api';
export const handler = async (req) => {

 
  const requestBody = req?.body ? JSON.parse(req.body) : {};
  const incomingFields = requestBody.fields || {};

  const response = await api.asApp().requestJira(route`/rest/api/3/issue`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fields: {   
        project: incomingFields.project || { key: "HM2" },
        summary: incomingFields.summary || "Created from Forge Webtrigger",
        issuetype: incomingFields.issuetype || { name: "Task" },
        description: incomingFields.description
      }
    })
  });

  const responseText = await response.text();   

  return {
    statusCode: response.status,
    body: responseText
  };
};
