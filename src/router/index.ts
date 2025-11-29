import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Page from "../pages/Page";
import End from "../pages/End";
import pageSettings from "../page-settings.json";

const getSinglePageSetting = (pageNumber: number) => {
    return pageSettings.find((page) => page.pageNumber === pageNumber);
}

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
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
            {
                path: "/end",
                Component: End
            }
        ]
    }
]);