import {
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../../../docs/docParser.js";

import { GetStaticPaths } from "next";
import { createMenu, mapTitles } from "../../../../docs/leftMenuGeneration.js";

export async function getStaticProps({
    params,
}: {
    params: { slug?: string; section?: string; productKey: string };
}) {
    const article = await getSinglePost({
        productKey: params.productKey,
        slug: params.slug,
        sectionSlug: params.section,
    });
    const menuSections = await createMenu(params.productKey);
    const titles = mapTitles(params.productKey);
    // calculating this locally out of laziness

    return {
        props: JSON.parse(
            JSON.stringify({
                productKey: params.productKey,
                ...titles,
                menuSections,
                article,
            })
        ),
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return getStaticDocsPageSlugs();
};

export { default } from "./index.jsx";
