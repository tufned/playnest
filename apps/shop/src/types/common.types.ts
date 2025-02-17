import routes from "~/constants/routes";

export type Routes = (typeof routes)[keyof typeof routes];
