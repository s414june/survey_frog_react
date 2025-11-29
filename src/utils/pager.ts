const nextRoute = (routePath: string, totalPages: number | null): string | null => {
    if (routePath === "/") {
        return getPageMoveRoute(1);
    }
    if (routePath === "/end") {
        return null;
    }
    if (totalPages === null) {
        return null;
    }
    const pathParts = routePath.split("/");
    const pageNumber = Number(pathParts[pathParts.length - 1]);
    if (pageNumber >= totalPages) {
        return "/end";
    }
    const gotoPage = pageMove(pageNumber, totalPages, 1);
    return getPageMoveRoute(gotoPage);
}

const prevRoute = (routePath: string, totalPages: number | null): string | null => {
    if (routePath === "/") {
        return null;
    }
    if (totalPages === null) {
        return null;
    }
    if (routePath === "/end") {
        return getPageMoveRoute(totalPages);
    }
    const pathParts = routePath.split("/");
    const pageNumber = Number(pathParts[pathParts.length - 1]);
    if (pageNumber <= 1) {
        return "/";
    }
    const gotoPage = pageMove(pageNumber, totalPages, -1);
    return getPageMoveRoute(gotoPage);
}

const pageMove = (pageNumber: number, totalPages: number, moveNumber: number): number | null => {
    if (isNaN(pageNumber) || pageNumber > totalPages) {
        return totalPages;
    }
    return pageNumber + moveNumber;
}

const getPageMoveRoute = (pageNumber: number | null): string => {
    return `/page/${pageNumber}`;
}

export { nextRoute, prevRoute };