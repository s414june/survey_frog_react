import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Page from "../pages/Page";
import pageSettings from "../page-settings.json";

const getSinglePageSetting = (pageNumber: number) => {
    return pageSettings.find((page) => page.pageNumber === pageNumber);
}

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/page/:pageNumber",
        Component: Page,
        loader: ({ params }) => {
            const singlePageSetting = getSinglePageSetting(Number(params.pageNumber));
            if (!singlePageSetting) {
                throw new Error("Page not found");
            }
            return singlePageSetting;
        }
    },
]);