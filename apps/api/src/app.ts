import "./init/envSetup.js";
import express from "express";
import serverSetup from "./init/serverSetup.js";

const app = express();

void serverSetup(app);
