import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("0c58d997-a702-4b2d-86be-e84db144747c");
    });

    return null;
};

export default CrispChat;
