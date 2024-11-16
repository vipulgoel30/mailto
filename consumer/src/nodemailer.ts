// Third party imports
import { createTransport } from "nodemailer";

let transport = null;
let isTransportInitializing: boolean = false;

const initTransport = () => {
  try {
    isTransportInitializing = true;
  } catch (err) {
    transport = null;
  } finally {
    isTransportInitializing = false;
  }
};
