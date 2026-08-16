import {readFileSync} from "node:fs";
import {join} from "node:path";

type ContentBlock={type:string;[key:string]:unknown};
type LegacyPage={title:string;description:string;blocks:ContentBlock[]};
type LegacyPagesData={legacyBlogPages:Record<string,LegacyPage>;privacyPolicyPage:LegacyPage};

const dataPath=join(process.cwd(),"app","data","legacyPages.json");
const data=JSON.parse(readFileSync(dataPath,"utf8")) as LegacyPagesData;

export const legacyBlogPages=data.legacyBlogPages;
export const privacyPolicyPage=data.privacyPolicyPage;
