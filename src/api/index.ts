import { KintoneRestAPIClient } from "@kintone/rest-api-client";

const appId = "";

const request = new KintoneRestAPIClient({
  baseUrl: "",
  auth: {
    username: "",
    password: "",
  },
});

export const getOrder = (query: string) =>
  request.record.getRecords<KintoneTypes.Order>({
    app: appId,
    fields: ["下單時間", "$id", "訂單總金額"],
    query
  })
