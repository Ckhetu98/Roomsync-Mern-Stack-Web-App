import axios from "axios";
import { CONTACT_API_URL } from "../utils/constants";

export const submitContact = async (contactData) => {
  const res = await axios.post(CONTACT_API_URL, contactData);
  return res.data;
};
