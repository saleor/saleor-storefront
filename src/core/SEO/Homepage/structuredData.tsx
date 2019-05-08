import { searchUrl } from "../../../components/App/routes"

export const structuredData = (shop) => {
    let data = {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": location.href,
        "name": shop.name,
        "description": shop.description,
        "potentialAction": {
            "@type": "SearchAction",
            "target": searchUrl + "?q={q}",
            "query-input": "required name=q",
        }

    }
    return JSON.stringify(data)
}
